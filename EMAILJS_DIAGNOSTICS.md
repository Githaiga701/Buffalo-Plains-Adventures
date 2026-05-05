# EmailJS Diagnostic Test Tool

## Problem Diagnosis

The error "failed to send, try again later" typically indicates one of these issues:

1. ❌ EmailJS credentials are incorrect or not configured
2. ❌ Email template variables don't match what we're sending
3. ❌ Email service hasn't been activated/connected to an email provider
4. ❌ Template ID or Service ID is incorrect

## Quick Fix Steps

### Step 1: Verify Environment Variables

Check that your `.env` file contains these exact values:

```bash
VITE_EMAILJS_PUBLIC_KEY=bOiK4PmHQv_fbe-7C_nuX
VITE_EMAILJS_SERVICE_ID=service_zsasm4m
VITE_EMAILJS_TEMPLATE_ID=template_mt3f6kj
```

### Step 2: Verify Email Template Variables

Your EmailJS template must use these **exact variable names**:

```
{{from_name}}
{{from_email}}
{{country}}
{{travel_dates}}
{{message}}
{{to_email}}
{{to_name}}
{{reply_to}}
{{subject}}
```

### Step 3: Check Email Service Connection

Go to https://dashboard.emailjs.com/ → Email Services

Verify that:
- ✅ An email service is connected (Gmail, Mailgun, etc.)
- ✅ The service is active
- ✅ The service ID matches: `service_zsasm4m`

### Step 4: Test Email Template

Go to https://dashboard.emailjs.com/ → Email Templates

1. Select template `template_mt3f6kj`
2. Click "Send Test"
3. Enter your email to verify it works

## JavaScript Test Script

Create a test file to verify EmailJS is working:

```javascript
// test-emailjs.js
import emailjs from '@emailjs/browser';

// Initialize with your public key
emailjs.init('bOiK4PmHQv_fbe-7C_nuX');

const templateParams = {
  from_name: 'Test User',
  from_email: 'test@example.com',
  country: 'Test Country',
  travel_dates: 'Test Dates',
  message: 'This is a test message',
  to_email: 'buffaloplainadventuresltd@gmail.com',
  to_name: 'Buffalo Plains Team',
  reply_to: 'test@example.com',
  subject: 'Test Inquiry'
};

emailjs.send('service_zsasm4m', 'template_mt3f6kj', templateParams)
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
```

## Common Issues & Solutions

### Issue 1: "Email service not configured" error
**Solution:** Check that all three environment variables are set in `.env`

### Issue 2: Template variables not matching
**Solution:** Ensure your EmailJS template uses the exact variable names we listed above

### Issue 3: Email service not connected
**Solution:** Connect Gmail or another service in EmailJS dashboard

### Issue 4: "Invalid domain" error
**Solution:** Add your domain to allowed domains in EmailJS settings

## Verify Configuration

Run this command to check if environment variables are loaded:

```bash
# In your project directory
cat .env | grep EMAILJS
```

Expected output:
```
VITE_EMAILJS_PUBLIC_KEY=bOiK4PmHQv_fbe-7C_nuX
VITE_EMAILJS_SERVICE_ID=service_zsasm4m
VITE_EMAILJS_TEMPLATE_ID=template_mt3f6kj
```

## Debugging in Browser

1. Open dev tools (F12)
2. Go to Console tab
3. Check for errors when submitting the form
4. Look for network tab to see EmailJS request/response

## Need Help?

If you're still having issues:

1. Go to https://dashboard.emailjs.com/
2. Check the "Requests" tab for failed attempts
3. Review error messages
4. Contact EmailJS support: https://emailjs.com/support

## Alternative: Use a Backend Proxy

If EmailJS continues to fail, set up a simple backend endpoint:

```javascript
// Node.js/Express example
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  
  // Use nodemailer or another email service
  await sendEmail({
    to: 'buffaloplainadventuresltd@gmail.com',
    from: email,
    subject: `New inquiry from ${name}`,
    text: message
  });
  
  res.json({ success: true });
});
```

This would require a backend server but provides more control.