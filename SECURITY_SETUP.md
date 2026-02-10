# 🔒 Secure Fillout Integration Setup

This guide explains the **secure serverless architecture** for Fillout integration that keeps your API key safe.

## 🏗️ Architecture Overview

```
Browser (Public)
    ↓
    POST /api/submit-order
    ↓
Vercel Serverless Function (Private)
    ↓
    Uses server-side env vars
    ↓
    POST to Fillout API
    ↓
Fillout Backend
```

**Key Point:** Your Fillout API key **never** touches the browser. It stays secure on the server.

---

## 📁 File Structure

```
/feelwellfurniture
├── /api                          # Serverless functions (secure)
│   ├── submit-order.js           # Handles checkout submissions
│   └── submit-contact.js         # Handles contact form submissions
├── /src
│   └── /pages
│       ├── Checkout.jsx          # Calls /api/submit-order
│       └── Contact.jsx           # Calls /api/submit-contact
├── .env                          # Environment variables (local dev)
├── .env.example                  # Template for environment variables
└── vercel.json                   # Vercel configuration
```

---

## 🔐 Environment Variables Explained

### Public Variables (Safe to Expose)
These are prefixed with `REACT_APP_` and are embedded in your frontend bundle:

```bash
REACT_APP_FILLOUT_FIELD_FULLNAME=wqYk
REACT_APP_FILLOUT_FIELD_EMAIL=3WFW
# ... etc
```

✅ **Safe because:** Field IDs are just references to form fields. They don't grant any access.

### Private Variables (Server-Side Only)
These are **NOT** prefixed with `REACT_APP_` and only exist on the server:

```bash
FILLOUT_API_KEY=sk_prod_xxxxx
FILLOUT_FORM_ID=abc123
FILLOUT_CONTACT_FORM_ID=xyz789
```

❌ **Never expose these:** They grant full access to your Fillout account.

---

## 🚀 Setup Instructions

### 1. Local Development

1. **Update your `.env` file** with the correct structure:
   ```bash
   # Copy from .env.example
   cp .env.example .env
   ```

2. **Add your credentials:**
   - `FILLOUT_API_KEY` - Your Fillout API key (no REACT_APP_ prefix)
   - `FILLOUT_FORM_ID` - Your order form ID
   - `FILLOUT_CONTACT_FORM_ID` - Your contact form ID
   - `REACT_APP_FILLOUT_FIELD_*` - All field IDs (these are safe to expose)

3. **Restart your dev server:**
   ```bash
   npm start
   ```

### 2. Vercel Deployment

#### Option A: Automatic (Recommended)

1. Push your code to GitHub
2. Import to Vercel
3. Vercel will automatically:
   - Detect the `/api` folder
   - Create serverless functions
   - Read your `.env` file (for first deploy)

#### Option B: Manual Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these **server-side variables**:

```bash
FILLOUT_API_KEY=sk_prod_xxxxx
FILLOUT_FORM_ID=abc123
FILLOUT_CONTACT_FORM_ID=xyz789
```

4. Add your **public variables** (REACT_APP_* prefixed ones)

⚠️ **Important:** 
- Do NOT prefix API keys with `REACT_APP_`
- Field IDs should have `REACT_APP_` prefix
- After adding variables, **redeploy** your app

---

## 🔍 How It Works

### Before (Insecure - API Key in Browser)

```javascript
// ❌ BAD: API key exposed in browser
fetch('https://api.fillout.com/...', {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_FILLOUT_API_KEY}` // Exposed!
  }
});
```

Anyone could:
- Open browser DevTools
- Find your API key in the JavaScript bundle
- Use it to submit spam or access your data

### After (Secure - API Key on Server)

```javascript
// ✅ GOOD: Browser only talks to your domain
fetch('/api/submit-order', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

The serverless function handles the Fillout API call:
```javascript
// api/submit-order.js
fetch('https://api.fillout.com/...', {
  headers: {
    Authorization: `Bearer ${process.env.FILLOUT_API_KEY}` // Server-side only!
  }
});
```

---

## 🧪 Testing

### Test Locally

1. Start the dev server:
   ```bash
   npm start
   ```

2. Try submitting:
   - An order from the checkout page
   - A message from the contact page

3. Check browser console for:
   ```
   Submitting order to secure API endpoint...
   ```

4. Check Fillout dashboard for submissions

### Test on Vercel

1. Deploy to Vercel
2. Test both forms
3. Check Vercel function logs:
   - Go to your project
   - Click **Deployments** → Latest deployment
   - Click **Functions** tab
   - View logs for `/api/submit-order` and `/api/submit-contact`

---

## 🛡️ Security Best Practices

### ✅ Do This

- Keep API keys in server-side environment variables only
- Use the `/api` folder for serverless functions
- Validate input in serverless functions before forwarding to Fillout
- Monitor function logs for suspicious activity
- Use rate limiting (see Advanced section below)

### ❌ Don't Do This

- Never prefix API keys with `REACT_APP_`
- Never hardcode API keys in source code
- Never commit `.env` to Git (it's in `.gitignore`)
- Never expose API keys in client-side JavaScript

---

## 🔧 Troubleshooting

### "Failed to submit order"

**Check 1:** Verify environment variables in Vercel
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Confirm `FILLOUT_API_KEY`, `FILLOUT_FORM_ID`, `FILLOUT_CONTACT_FORM_ID` exist
4. Redeploy after adding variables

**Check 2:** Check function logs
1. Go to Vercel → Deployments → Latest
2. Click **Functions** tab
3. Look for error messages

### "API key not defined"

Your serverless function can't find the API key.

**Fix:**
1. Check that `FILLOUT_API_KEY` exists in Vercel environment variables (no `REACT_APP_` prefix)
2. Redeploy the app
3. Clear cache: `vercel --force`

### "Field IDs not found"

The frontend can't find field IDs.

**Fix:**
1. Check that field ID variables have `REACT_APP_` prefix
2. Restart dev server locally
3. Redeploy to Vercel

### Local dev works but Vercel doesn't

**Fix:**
1. Ensure environment variables are set in Vercel dashboard
2. Redeploy after setting variables
3. Check that `.env` is in `.gitignore` (it is by default)

---

## 🚀 Advanced: Rate Limiting

To prevent abuse, add rate limiting to your serverless functions:

```javascript
// api/submit-order.js
const submissions = new Map();

export default async function handler(req, res) {
  // Get client IP
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Check rate limit (max 5 submissions per hour)
  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];
  const recentSubmissions = userSubmissions.filter(time => now - time < 3600000);
  
  if (recentSubmissions.length >= 5) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  
  // Record this submission
  recentSubmissions.push(now);
  submissions.set(ip, recentSubmissions);
  
  // Continue with form submission...
}
```

---

## 📊 Monitoring

### View Submission Logs

**In Fillout:**
- Go to your form → **Responses** tab
- See all submissions with timestamps

**In Vercel:**
- Go to your project → **Deployments** → Latest → **Functions**
- View real-time logs for each API call
- Check for errors or suspicious activity

### Set Up Alerts

1. In Fillout:
   - Settings → Integrations → Email Notifications
   - Get notified on new submissions

2. In Vercel:
   - Integrations → Add monitoring service
   - Set up error alerts

---

## 🆘 Need Help?

- [Vercel Serverless Functions Docs](https://vercel.com/docs/functions)
- [Fillout API Documentation](https://www.fillout.com/help/fillout-rest-api)
- [Environment Variables in Vercel](https://vercel.com/docs/environment-variables)

---

## 📝 Summary

✅ **What We Built:**
- Secure serverless proxy for Fillout API calls
- API key stays server-side only
- Works seamlessly in development and production

✅ **What's Protected:**
- Your Fillout API key
- Your form IDs
- Your account access

✅ **What's Safe to Expose:**
- Field IDs (they're just references)
- Your website URL
- Form field structure

🎉 **Your Fillout integration is now production-ready and secure!**
