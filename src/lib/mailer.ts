import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP_EMAIL or SMTP_PASSWORD not configured. Skipping email send.');
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"RoyalVana Banquet" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendSMS = async ({
  to,
  message,
}: {
  to: string;
  message: string;
}) => {
  const API_KEY = process.env.FAST2SMS_API_KEY;
  
  if (!API_KEY) {
    console.warn('FAST2SMS_API_KEY is not configured in .env.local. Mocking SMS:');
    console.log(`\n========================================`);
    console.log(`[SMS NOTIFICATION] To: ${to}`);
    console.log(`Message: ${message}`);
    console.log(`========================================\n`);
    return { success: true, message: 'Mock SMS logged' };
  }

  try {
    const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message: message,
        language: 'english',
        flash: 0,
        numbers: to
      })
    });

    const data = await res.json();
    console.log('Fast2SMS Response:', data);
    return data;
  } catch (error) {
    console.error('Error sending SMS via Fast2SMS:', error);
    throw error;
  }
};
