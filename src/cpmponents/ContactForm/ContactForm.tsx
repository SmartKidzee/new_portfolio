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

const ContactForm: React.FC<ContactFormProps> = ({ }) => {
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
      <div className="text-white font-bold text-sm mt-2 bg-stranger-red/20 p-2 rounded-md border border-stranger-red shadow-sm">
        {state.errors[field].map((error, index) => (
          <p key={index} className="flex items-center text-stranger-red-light">
            <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />
            {error}
          </p>
        ))}
      </div>
    );
  };

  const isProcessing = state.submitting || state.validating;

  return (
    <div className="bg-black/50 rounded-xl border border-white/10 shadow-2xl p-6 md:p-8 backdrop-blur-md">
      {state.succeeded ? (
        <div className="py-10 px-6 text-center">
          <div className="mb-6 w-16 h-16 mx-auto bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-white text-2xl font-bold uppercase mb-3 text-glow-green">Message Sent!</p>
          <p className="text-gray-300 text-lg font-medium">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="space-y-7"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold uppercase mb-2 text-stranger-red tracking-wider"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-5 py-4 bg-black/50 rounded-lg text-white font-medium border border-white/10 outline-none focus:border-stranger-red focus:shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all duration-300 placeholder:text-gray-600"
              disabled={isProcessing}
            />
            <FieldError field="name" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold uppercase mb-2 text-stranger-red tracking-wider"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full px-5 py-4 bg-black/50 rounded-lg text-white font-medium border border-white/10 outline-none focus:border-stranger-red focus:shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all duration-300 placeholder:text-gray-600"
              disabled={isProcessing}
            />
            <FieldError field="email" />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-bold uppercase mb-2 text-stranger-red tracking-wider"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Your message here..."
              className="w-full px-5 py-4 bg-black/50 rounded-lg text-white font-medium border border-white/10 outline-none focus:border-stranger-red focus:shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all duration-300 placeholder:text-gray-600"
              disabled={isProcessing}
            ></textarea>
            <FieldError field="message" />
          </div>
          {state.errors && state.errors.form && (
            <div className="text-white text-sm bg-stranger-red/10 rounded-lg p-4 border border-stranger-red">
              {state.errors.form.map((error, index) => (
                <p key={index} className="flex items-center font-bold text-stranger-red-light">
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
              className="w-full py-4 px-6 bg-gradient-to-r from-stranger-red to-stranger-dark text-white font-bold uppercase rounded-lg border border-transparent shadow-lg hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg tracking-widest"
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