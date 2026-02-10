// Vercel Serverless Function for Order Submission
// This keeps your Fillout API key secure on the server

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // Validate request body
    if (!body || !body.submissions || !Array.isArray(body.submissions)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Call Fillout API with server-side credentials
    const response = await fetch(
      `https://api.fillout.com/v1/api/forms/${process.env.FILLOUT_FORM_ID}/submissions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FILLOUT_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );

    // Handle Fillout API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fillout API Error:', errorText);
      
      return res.status(response.status).json({ 
        error: 'Failed to submit order',
        details: errorText 
      });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
