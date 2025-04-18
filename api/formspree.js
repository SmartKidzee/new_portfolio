// Serverless function to proxy form submissions to Formspree
export default async function handler(request, response) {
  try {
    // Get form data from request
    const formData = await request.formData();
    
    // Forward to Formspree
    const formspreeResponse = await fetch('https://formspree.io/f/xkndlgya', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // Get response data
    const data = await formspreeResponse.json();
    
    // Return the Formspree response
    return response.status(formspreeResponse.status).json(data);
  } catch (error) {
    console.error('Formspree proxy error:', error);
    return response.status(500).json({ 
      errors: [{ message: 'Error submitting form. Please try again later.' }] 
    });
  }
}
