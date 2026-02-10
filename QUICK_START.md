# ⚡ Quick Start Guide

Get your Feelwell Furniture site running in minutes!

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start dev server
npm start
```

Your site will open at `http://localhost:3000`

**Note:** Cart and contact forms won't work until you set up Fillout (see below).

---

## 📝 Setting Up Forms (Optional but Recommended)

### Quick Setup Checklist

- [ ] Create Fillout account at [fillout.com](https://fillout.com)
- [ ] Create **Order Form** with these fields:
  - Full Name, Email, Phone, Address, Notes, cart_json (hidden), Order Total
- [ ] Create **Contact Form** with these fields:
  - Name, Email, Phone, Subject, Message
- [ ] Get **API Key** from Fillout (Settings → API)
- [ ] Get **Form IDs** for both forms
- [ ] Get **Field IDs** for all fields (click each field → copy ID)
- [ ] Add all credentials to `.env` file
- [ ] Restart dev server: `npm start`

### Environment Variables You Need

```bash
# Server-side (NO REACT_APP_ prefix)
FILLOUT_API_KEY=sk_prod_xxxxx
FILLOUT_FORM_ID=abc123
FILLOUT_CONTACT_FORM_ID=xyz789

# Client-side (WITH REACT_APP_ prefix)
REACT_APP_FILLOUT_FIELD_FULLNAME=field_id_here
REACT_APP_FILLOUT_FIELD_EMAIL=field_id_here
REACT_APP_FILLOUT_FIELD_PHONE=field_id_here
REACT_APP_FILLOUT_FIELD_ADDRESS=field_id_here
REACT_APP_FILLOUT_FIELD_NOTES=field_id_here
REACT_APP_FILLOUT_FIELD_CART=field_id_here
REACT_APP_FILLOUT_FIELD_TOTAL=field_id_here

REACT_APP_FILLOUT_CONTACT_FIELD_NAME=field_id_here
REACT_APP_FILLOUT_CONTACT_FIELD_EMAIL=field_id_here
REACT_APP_FILLOUT_CONTACT_FIELD_PHONE=field_id_here
REACT_APP_FILLOUT_CONTACT_FIELD_SUBJECT=field_id_here
REACT_APP_FILLOUT_CONTACT_FIELD_MESSAGE=field_id_here
```

📖 **Detailed instructions:** [FILLOUT_SETUP.md](./FILLOUT_SETUP.md)

---

## 🚀 Deploying to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Go to vercel.com and import your GitHub repo

# 3. Add environment variables in Vercel:
#    Settings → Environment Variables
#    Add all the variables from your .env file

# 4. Deploy!
```

🔒 **Security info:** [SECURITY_SETUP.md](./SECURITY_SETUP.md)

---

## 🎯 Testing Checklist

After setup, test these features:

### Shopping Cart
- [ ] Add product to cart from product page
- [ ] View cart (click cart icon in navbar)
- [ ] Update quantity in cart
- [ ] Remove item from cart
- [ ] Proceed to checkout
- [ ] Fill out checkout form
- [ ] Submit order
- [ ] Check Fillout dashboard for submission

### Contact Form
- [ ] Go to Contact page
- [ ] Fill out form
- [ ] Submit message
- [ ] See success message
- [ ] Check Fillout dashboard for submission

### Theme Toggle
- [ ] Click moon/sun icon in navbar
- [ ] Verify dark/light mode switches
- [ ] Refresh page - theme should persist

---

## 🛠️ Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
```bash
# Make sure to restart dev server after changing .env
# Stop with Ctrl+C, then:
npm start
```

### Fillout submissions not working locally
- Check that `.env` file exists in project root
- Verify all field IDs are correct (copy from Fillout form editor)
- Check browser console for error messages
- Verify API key doesn't have `REACT_APP_` prefix

### Forms work locally but not on Vercel
- Add environment variables in Vercel dashboard
- Make sure variable names match exactly
- Redeploy after adding variables
- Check Vercel function logs: Deployments → Functions tab

---

## 📚 Documentation Index

- **[README.md](./README.md)** - Full project overview
- **[FILLOUT_SETUP.md](./FILLOUT_SETUP.md)** - Detailed Fillout integration guide
- **[SECURITY_SETUP.md](./SECURITY_SETUP.md)** - Security & deployment guide
- **[api/README.md](./api/README.md)** - Serverless functions documentation

---

## 💡 Tips

- **Field IDs are safe to expose** - They're just references, not credentials
- **API key must stay server-side** - Never prefix it with `REACT_APP_`
- **Restart after .env changes** - Environment variables load on startup
- **Check Fillout dashboard** - See all form submissions in real-time
- **View function logs** - Debug issues in Vercel Functions tab

---

## 🆘 Still Stuck?

1. Read the detailed guides in the links above
2. Check browser console for errors (F12 → Console tab)
3. Check Vercel function logs (if deployed)
4. Verify all environment variables are set correctly
5. Make sure you restarted the dev server after changing `.env`

Happy coding! 🎉
