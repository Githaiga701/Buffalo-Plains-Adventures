# Email Setup Guide for Contact Form

This guide will help you set up email functionality for the Buffalo Plains Adventures contact form. The form now sends inquiries directly to `buffaloplainadventuresltd@gmail.com`.

## Prerequisites

You'll need an [EmailJS](https://www.emailjs.com) account (free tier available).

## Setup Steps

### 1. Create EmailJS Account

1. Go to [https://dashboard.emailjs.com](https://dashboard.emailjs.com)
2. Sign up for a free account
3. Complete the account setup

### 2. Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose your email provider:
   - Gmail (recommended)
   - Mailgun
   - SMTP
   - Or other providers
4. Connect your email account
5. Note the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Name it "Buffalo Plains Inquiry"
4. Use the following template:

**Subject:**
```
New Inquiry from {{from_name}}
```

**HTML Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2F855A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #f7fafc; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #2d3748; display: block; margin-bottom: 5px; }
    .value { color: #4a5568; }
    .message-box { background-color: white; padding: 15px; border-left: 4px solid #2F855A; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <p>Hello Buffalo Plains Team,</p>
      <p>A new inquiry has been submitted through the website. Here are the details:</p>
      
      <div class="field">
        <span class="label">Name:</span>
        <span class="value">{{from_name}}</span>
      </div>
      
      <div class="field">
        <span class="label">Email:</span>
        <span class="value">{{from_email}}</span>
      </div>
      
      <div class="field">
        <span class="label">Country:</span>
        <span class="value">{{country}}</span>
      </div>
      
      <div class="field">
        <span class="label">Travel Dates:</span>
        <span class="value">{{travel_dates}}</span>
      </div>
      
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">{{message}}</div>
      </div>
      
      <p style="margin-top: 20px;">Best regards,<br>The Buffalo Plains Adventures Website</p>
    </div>
  </div>
</body>
</html>
```

**Plain Text (fallback):**
```
New Inquiry from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Country: {{country}}
Travel Dates: {{travel_dates}}

Message:
{{message}}
```

5. Save the template and note the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

1. Go to **Account** → **API Keys** in EmailJS dashboard
2. Copy your **Public Key** (e.g., `user_abc123xyz`)

### 5. Configure Environment Variables

Create a `.env` file in the project root (next to `package.json`) with the following content:

```bash
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here

# Existing configurations (keep these)
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_CLIENT_SECRET
PAYPAL_WEBHOOK_ID=YOUR_PAYPAL_WEBHOOK_ID
MPESA_CONSUMER_KEY=YOUR_MPESA_CONSUMER_KEY
MPESA_CONSUMER_SECRET=YOUR_MPESA_CONSUMER_SECRET
MPESA_SHORTCODE=YOUR_MPESA_SHORTCODE
MPESA_PASSKEY=YOUR_MPESA_PASSKEY
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/webhook
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:** Never commit your `.env` file to version control!

### 6. Test the Contact Form

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email (`buffaloplainadventuresltd@gmail.com`) - you should receive the inquiry

## Troubleshooting

### Email not being sent

- **Check console for errors**: Open browser DevTools (F12) and look for errors
- **Verify credentials**: Ensure all three environment variables are correctly set
- **Check EmailJS dashboard**: Look for failed requests in the dashboard
- **Email in spam**: Check spam/junk folder
- **Template variables**: Ensure all variables in the template match those sent (e.g., `{{from_name}}`, `{{from_email}}`)

### Common Error Messages

- **"Email service not configured"**: Missing or incorrect environment variables
- **"Failed to send an email"**: Incorrect Service ID, Template ID, or Public Key
- **Network errors**: Check internet connection and CORS settings

### Testing Without EmailJS

If you prefer not to use EmailJS, you can:

1. Use a different email service (Mailgun, SendGrid, etc.) with a custom API
2. Set up a backend endpoint to handle email sending
3. Use form backend services like Formspree or Getform
###this is a test issue

## Features

- ✅ **Client-side email sending** - No backend required
- ✅ **Form validation** - Built-in validation with react-hook-form
- ✅ **Error handling** - Clear error messages for users
- ✅ **Loading states** - Visual feedback during submission
- ✅ **Success confirmation** - Thank you message after submission
- ✅ **Responsive design** - Works on all devices

## Security Considerations

- EmailJS public key is safe to expose in frontend code
- Never expose SMTP credentials in frontend
- Use rate limiting on email service if needed
- Consider implementing CAPTCHA for production
- Monitor for spam/abuse in EmailJS dashboard

## Support

- EmailJS Documentation: https://dashboard.emailjs.com/docs
- EmailJS Support: https://dashboard.emailjs.com/support
- Buffalo Plains Adventures: buffaloplainadventuresltd@gmail.com