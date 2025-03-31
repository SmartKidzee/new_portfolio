export const validateEmail = async (email: string): Promise<boolean> => {
  const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Email validation API error");

    const data = await response.json();
    
    // Check if email is valid, non-disposable, and SMTP exists
    return data.is_valid_format.value && 
           !data.is_disposable_email.value &&
           data.is_smtp_valid.value;
  } catch (error) {
    console.error("Email validation failed:", error);
    // Return true on API failure to avoid blocking form submission
    // when validation service is unavailable
    return true;
  }
};

// Advanced validation response interface
export interface EmailValidationResult {
  isValid: boolean;
  details?: {
    format: boolean;
    disposable: boolean;
    smtp: boolean;
  };
  error?: string;
}

// Advanced version that returns more details for custom error messages
export const validateEmailWithDetails = async (email: string): Promise<EmailValidationResult> => {
  const apiKey = import.meta.env.VITE_ABSTRACT_API_KEY;
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        isValid: true, // Allow submission on API error
        error: "Email validation service unavailable"
      };
    }

    const data = await response.json();
    
    const formatValid = data.is_valid_format.value;
    const notDisposable = !data.is_disposable_email.value;
    const smtpValid = data.is_smtp_valid.value;
    
    return {
      isValid: formatValid && notDisposable && smtpValid,
      details: {
        format: formatValid,
        disposable: !notDisposable,
        smtp: smtpValid
      }
    };
  } catch (error) {
    console.error("Email validation failed:", error);
    return {
      isValid: true, // Allow submission on API error
      error: "Email validation service unavailable"
    };
  }
}; 