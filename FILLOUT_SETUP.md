# Fillout Integration Setup Guide

This guide will help you set up the Fillout integration for the shopping cart feature.

## 1. Create a Fillout Account

Go to [fillout.com](https://fillout.com) and sign up for a free account.

## 2. Create Your Order Form

1. Click **Create Form**
2. Choose **Blank form**
3. Add the following fields (in this exact order):

### Required Fields:

| Field Label | Field Type | Settings |
|------------|------------|----------|
| Full Name | Short text | Required |
| Email | Email | Required |
| Phone | Short text | Required |
| Address | Long text | Required |
| Notes | Long text | Optional |
| cart_json | Long text | **Hidden**, Required |
| Order Total | Short text | Required |

**Important:** The `cart_json` field MUST be marked as **Hidden** - this is where the cart data will be automatically sent.

## 3. Get Your API Credentials

1. Open your form
2. Click **Settings** → **Integrations** → **API**
3. Copy your:
   - **Form ID** (looks like: `abc123xyz`)
   - **API Key** (long string starting with `Bearer`)

## 4. Get Field IDs from Your Form

**CRITICAL STEP:** You need the unique Field ID for each field in your Fillout form.

### How to Get Field IDs:

1. In your Fillout form editor, click on each field to edit it
2. Look for **"Field ID"** or **"Question ID"** in the right sidebar (field settings)
3. Copy the ID - it's usually a random string like `abc123xyz`, `bK7mN2pQ`, etc.

You need to get the Field ID for ALL 7 fields:
- Full Name field
- Email field  
- Phone field
- Address field
- Notes field
- cart_json field (the hidden one)
- Order Total field

**Screenshot locations to find Field IDs:**
- Usually in the right sidebar when you click on a field
- Sometimes under "Advanced" or "Settings" tab
- Look for "ID", "Field ID", or "Question ID"

## 5. Configure Your Application

Your `.env` file should look like this:

```bash
# Form credentials
REACT_APP_FILLOUT_FORM_ID=dQdS73JMqcus
REACT_APP_FILLOUT_API_KEY=your_actual_api_key_here

# Field IDs - Replace these with actual IDs from your Fillout form
REACT_APP_FILLOUT_FIELD_FULLNAME=actual_field_id_here
REACT_APP_FILLOUT_FIELD_EMAIL=actual_field_id_here
REACT_APP_FILLOUT_FIELD_PHONE=actual_field_id_here
REACT_APP_FILLOUT_FIELD_ADDRESS=actual_field_id_here
REACT_APP_FILLOUT_FIELD_NOTES=actual_field_id_here
REACT_APP_FILLOUT_FIELD_CART=actual_field_id_here
REACT_APP_FILLOUT_FIELD_TOTAL=actual_field_id_here
```

**Replace ALL the placeholder values with your actual values!**

## 6. Restart Your Dev Server

**CRITICAL:** After setting up your `.env` file with all the Field IDs:

```bash
# Stop your dev server (Ctrl+C or Cmd+C)
# Then start it again:
npm start
```

Environment variables only load when the server starts!

## 7. Set Up Integrations (Optional but Recommended)

### Google Sheets Integration

1. In your Fillout form, go to **Settings** → **Integrations** → **Google Sheets**
2. Connect your Google account
3. Choose or create a spreadsheet
4. Each order submission will automatically create a new row

### Email Notifications

1. Go to **Settings** → **Integrations** → **Email**
2. Set up:
   - **Admin notification** - sends you an email for each order
   - **Customer confirmation** - sends the customer a confirmation email

### Other Integrations

Fillout also supports:
- **Notion** - save orders to a Notion database
- **Airtable** - sync orders to Airtable
- **Webhooks** - send data to your own server
- **Zapier/Make** - connect to 1000+ other apps

## 6. Test Your Integration

1. Start your development server:
   ```bash
   npm start
   ```

2. Add items to your cart
3. Go to checkout and submit an order
4. Check your Fillout dashboard → **Responses** to see the submission

## 7. Security Best Practices

⚠️ **Important Security Notes:**

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- Never expose your API key in client-side code (except in environment variables)
- For production, consider adding server-side price validation
- Enable Fillout's spam protection in Settings → Security

## Troubleshooting

### "Missing Fillout field IDs in .env"

This error means you haven't added the Field IDs to your `.env` file yet.

**Fix:**
1. Go to your Fillout form
2. Click on each field and copy its Field ID
3. Add all 7 Field IDs to your `.env` file
4. Restart your dev server

### "Invalid input: expected string, received undefined" (at path questions/0/id)

This is the same as above - missing Field IDs in your `.env` file.

### "Failed to submit order"

Common causes:
- **Missing API Key**: Make sure `REACT_APP_FILLOUT_API_KEY` is set in `.env`
- **Wrong Form ID**: Verify `REACT_APP_FILLOUT_FORM_ID` matches your form
- **Field IDs not matching**: The Field IDs in `.env` must exactly match the IDs in your Fillout form
- **Didn't restart server**: After changing `.env`, restart with `npm start`

### No data appearing in Fillout

- Check the browser console for errors
- Verify your `.env` file is in the project root
- Restart your development server after creating `.env`

### Price validation

Currently, prices are sent from the frontend. For production use, you should:
1. Set up a webhook endpoint
2. Validate product prices against your database
3. Calculate the correct total server-side
4. Only then approve the order

## Data Format

The cart data is sent as JSON in the `cart_json` field:

```json
[
  {
    "name": "BY24-31 Bed",
    "price": 725.00,
    "quantity": 1,
    "subtotal": "725.00"
  },
  {
    "name": "CP23-89 Sofa",
    "price": 845.00,
    "quantity": 2,
    "subtotal": "1690.00"
  }
]
```

This allows you to easily process orders in spreadsheets or automate fulfillment workflows.

## Need Help?

- [Fillout Documentation](https://www.fillout.com/help)
- [Fillout API Reference](https://www.fillout.com/help/fillout-rest-api)
