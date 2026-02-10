# API Routes (Vercel Serverless Functions)

This directory contains serverless functions that run on Vercel's edge network. These functions act as a secure proxy between your frontend and the Fillout API, keeping your API key safe.

## 🔒 Security Architecture

```
Browser → /api/submit-order → Fillout API
         (public)            (private)
```

The API key never reaches the browser—it stays on the server where it belongs.

## 📁 Files

### `submit-order.js`
Handles order/checkout form submissions.

**Endpoint:** `POST /api/submit-order`

**Request Body:**
```json
{
  "submissions": [{
    "questions": [
      { "id": "wqYk", "value": "John Doe" },
      { "id": "3WFW", "value": "john@example.com" },
      ...
    ]
  }]
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Used by:** `src/pages/Checkout.jsx`

---

### `submit-contact.js`
Handles contact form submissions.

**Endpoint:** `POST /api/submit-contact`

**Request Body:**
```json
{
  "submissions": [{
    "questions": [
      { "id": "abc", "value": "Jane Smith" },
      { "id": "xyz", "value": "jane@example.com" },
      ...
    ]
  }]
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Used by:** `src/pages/Contact.jsx`

---

## 🔐 Environment Variables Required

These functions need these server-side environment variables:

```bash
FILLOUT_API_KEY=sk_prod_xxxxx
FILLOUT_FORM_ID=abc123
FILLOUT_CONTACT_FORM_ID=xyz789
```

**Note:** These are **NOT** prefixed with `REACT_APP_` because they must stay server-side.

---

## 🧪 Testing Locally

Vercel CLI can run these functions locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run dev server with serverless functions
vercel dev
```

This will start both your React app and the API functions.

---

## 🚀 Deployment

These functions deploy automatically when you push to Vercel:

1. Push code to GitHub
2. Vercel detects the `/api` folder
3. Creates serverless functions automatically
4. Functions are available at `https://yourdomain.com/api/*`

---

## 📊 Monitoring

View function logs in Vercel:

1. Go to your project dashboard
2. **Deployments** → Latest deployment
3. **Functions** tab
4. Click on a function to see logs

---

## 🛡️ Security Features

- ✅ API key stays server-side
- ✅ Input validation before forwarding to Fillout
- ✅ Error handling with detailed logs
- ✅ CORS headers managed by Vercel
- ✅ Automatic HTTPS

---

## 📖 Learn More

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [SECURITY_SETUP.md](../SECURITY_SETUP.md) - Full security documentation
- [FILLOUT_SETUP.md](../FILLOUT_SETUP.md) - Form setup guide
