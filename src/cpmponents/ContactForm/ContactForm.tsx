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
      const formspreeResponse = await fetch('/api/formspree', {
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
      <div className="text-red-400 text-xs mt-1 pl-1">
        {state.errors[field].map((error, index) => (
          <p key={index} className="flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {error}
          </p>
        ))}
      </div>
    );
  };

  const isProcessing = state.submitting || state.validating;

  return (
    <div className="bg-white/8 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-xl">
      {state.succeeded ? (
        <div className="py-12 px-6 rounded-2xl text-center">
          <div className="mb-6 w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-300 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[#0F172A]" />
          </div>
          <p className="text-white text-2xl font-medium mb-3">Message Sent</p>
          <p className="text-white/70 text-lg">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-white/80"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-5 py-4 bg-[#1E293B]/50 rounded-2xl outline-none border border-white/10 transition-all focus:border-white/30 focus:ring-2 focus:ring-indigo-500/20"
              disabled={isProcessing}
            />
            <FieldError field="name" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-white/80"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-5 py-4 bg-[#1E293B]/50 rounded-2xl outline-none border border-white/10 transition-all focus:border-white/30 focus:ring-2 focus:ring-indigo-500/20"
              disabled={isProcessing}
            />
            <FieldError field="email" />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2 text-white/80"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Your message here..."
              className="w-full px-5 py-4 bg-[#1E293B]/50 rounded-2xl outline-none border border-white/10 transition-all focus:border-white/30 focus:ring-2 focus:ring-indigo-500/20"
              disabled={isProcessing}
            ></textarea>
            <FieldError field="message" />
          </div>
          {state.errors && state.errors.form && (
            <div className="text-red-400 text-sm bg-red-500/10 rounded-xl p-3 border border-red-500/20">
              {state.errors.form.map((error, index) => (
                <p key={index} className="flex items-center">
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
              className="w-full py-4 px-6 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A855F7] rounded-2xl font-medium text-[#0F172A] shadow-lg text-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
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