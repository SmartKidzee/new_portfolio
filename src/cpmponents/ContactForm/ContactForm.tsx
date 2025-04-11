import React, { useState } from 'react';
import { Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { validateEmailWithDetails } from '../../lib/validateEmail';
import emailjs from 'emailjs-com';

interface ContactFormProps {
  formId: string;
}

interface FormState {
  submitting: boolean;
  validating: boolean;
  succeeded: boolean;
  errors: {
    [key: string]: string[]
  } | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ formId }) => {
  const [state, setState] = useState<FormState>({
    submitting: false,
    validating: false,
    succeeded: false,
    errors: null
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;
    
    // Set validating state
    setState(prev => ({ ...prev, validating: true, errors: null }));
    
    try {
      // Validate email before submission
      const validationResult = await validateEmailWithDetails(email);
      
      if (!validationResult.isValid) {
        // Handle validation errors
        const errors: {[key: string]: string[]} = {};
        
        if (validationResult.error) {
          errors.email = [validationResult.error];
        } else if (validationResult.details) {
          const details = validationResult.details;
          if (!details.format) {
            errors.email = ["Invalid email format"];
          } else if (details.disposable) {
            errors.email = ["Disposable email addresses are not allowed"];
          } else if (!details.smtp) {
            errors.email = ["This email address appears to be invalid or non-existent"];
          }
        }
        
        setState({
          submitting: false,
          validating: false,
          succeeded: false,
          errors
        });
        return;
      }
      
      // If email validation passed, proceed with form submission
      setState(prev => ({ ...prev, validating: false, submitting: true }));
      
      // 1. Submit form to Formspree
      const formspreeResponse = await fetch('https://formspree.io/f/xkndlgya', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // 2. Send confirmation email via EmailJS
      try {
        console.log('Attempting to send email via EmailJS...');
        // Prepare EmailJS parameters
        const emailJSParams = {
          name: name,
          email: email,
          message: message,
        };
        
        // Send confirmation email using EmailJS
        const emailJSResponse = await emailjs.send(
          "service_ju04z6i",
          "template_54bk5b9",
          emailJSParams,
          "NibnsAP5_aReWewFd"
        );
        
        console.log('EmailJS response:', emailJSResponse);
      } catch (emailJSError) {
        // Log the error but continue with the form submission process
        console.error('EmailJS error:', emailJSError);
        // Don't return here, we still want to show success if Formspree worked
      }
      
      if (formspreeResponse.ok) {
        setState({
          submitting: false,
          validating: false,
          succeeded: true,
          errors: null
        });
        form.reset();
      } else {
        const data = await formspreeResponse.json();
        setState({ 
          submitting: false,
          validating: false,
          succeeded: false, 
          errors: data.errors || null 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setState({ 
        submitting: false,
        validating: false,
        succeeded: false, 
        errors: { "form": ["Network error. Please try again later."] }
      });
    }
  };

  // Custom validation error display component
  const FieldError = ({ field }: { field: string }) => {
    if (!state.errors || !state.errors[field]) return null;
    
    return (
      <div className="text-black font-bold text-sm mt-2 bg-[#FF5C5C] p-2 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {state.errors[field].map((error, index) => (
          <p key={index} className="flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />
            {error}
          </p>
        ))}
      </div>
    );
  };

  const isProcessing = state.submitting || state.validating;

  return (
    <div className="bg-white rounded-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {state.succeeded ? (
        <div className="py-10 px-6 text-center">
          <div className="mb-6 w-16 h-16 mx-auto bg-[#00CC66] border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-black" />
          </div>
          <p className="text-black text-2xl font-extrabold uppercase mb-3" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>Message Sent!</p>
          <p className="text-black text-lg font-medium">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-extrabold uppercase mb-2 text-black"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-5 py-4 bg-[#FFE603] rounded-md text-black font-medium border-3 border-black outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all"
              disabled={isProcessing}
            />
            <FieldError field="name" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-extrabold uppercase mb-2 text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-5 py-4 bg-[#FFE603] rounded-md text-black font-medium border-3 border-black outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all"
              disabled={isProcessing}
            />
            <FieldError field="email" />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-extrabold uppercase mb-2 text-black"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Your message here..."
              className="w-full px-5 py-4 bg-[#FFE603] rounded-md text-black font-medium border-3 border-black outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 transition-all"
              disabled={isProcessing}
            ></textarea>
            <FieldError field="message" />
          </div>
          {state.errors && state.errors.form && (
            <div className="text-black text-sm bg-[#FF5C5C] rounded-md p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {state.errors.form.map((error, index) => (
                <p key={index} className="flex items-center font-bold">
                  <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </p>
              ))}
            </div>
          )}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-[#FF3E00] text-white font-extrabold uppercase rounded-md border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-2 active:translate-y-2 transition-all duration-150 text-lg"
            >
              {state.validating ? (
                <span className="flex items-center justify-center">
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Validating Email...
                </span>
              ) : state.submitting ? (
                <span className="flex items-center justify-center">
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 