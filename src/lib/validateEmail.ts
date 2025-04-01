import axios from "axios";

// Debug information to see if environment variables are loaded
console.log('Hunter Environment variables:', {
  VITE_HUNTER_IO_API_KEY_EXISTS: !!import.meta.env.VITE_HUNTER_IO_API_KEY,
  VITE_HUNTER_IO_API_KEY_LENGTH: import.meta.env.VITE_HUNTER_IO_API_KEY?.length,
  ENV_KEYS: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
});

// Get API key from environment variables
const HUNTER_API_KEY = import.meta.env.VITE_HUNTER_IO_API_KEY || "";

// Log API key information (without revealing the full key)
console.log('Hunter API Key:', {
  exists: !!HUNTER_API_KEY,
  length: HUNTER_API_KEY?.length,
  firstChars: HUNTER_API_KEY ? `${HUNTER_API_KEY.substring(0, 4)}...` : null
});

// Basic validation - returns boolean
export const validateEmail = async (email: string): Promise<boolean> => {
  if (!HUNTER_API_KEY) {
    console.error("Hunter.io API key is not configured");
    // Return true to allow form submission if API key is missing
    return true;
  }
  
  try {
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${HUNTER_API_KEY}`
    );
    
    const data = response.data.data;
    
    // Return true if email is valid
    return data.status === "valid";
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
  if (!HUNTER_API_KEY) {
    console.error("Hunter.io API key is not configured");
    return {
      isValid: true, // Allow submission on missing API key
      error: "Email validation service not configured"
    };
  }
  
  try {
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${HUNTER_API_KEY}`
    );
    
    const data = response.data.data;
    
    // Convert Hunter.io results to our interface format
    const formatValid = data.regexp || false;
    const smtpValid = data.smtp_server || false;
    const notDisposable = !data.disposable || true;
    
    return {
      isValid: data.status === "valid",
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