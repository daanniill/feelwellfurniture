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

## 4. Configure Your Application

Create a `.env` file in the project root:

```bash
REACT_APP_FILLOUT_FORM_ID=your_form_id_here
REACT_APP_FILLOUT_API_KEY=your_api_key_here
```

Replace the placeholder values with your actual credentials from step 3.

## 5. Set Up Integrations (Optional but Recommended)

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

### "Failed to submit order"

- Check that your Form ID and API Key are correct
- Make sure the field names in the form exactly match:
  - `Full Name`
  - `Email`
  - `Phone`
  - `Address`
  - `Notes`
  - `cart_json`
  - `Order Total`

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
