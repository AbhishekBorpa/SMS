const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create a transporter using Ethereal (for testing) or a real SMTP service
    // For this demo, we'll try to use a static Ethereal account if env vars are present, or generate one

    let transporter;

    if (process.env.SMTP_HOST) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
    } else {
        // Fallback to generating a test account
        const testAccount = await nodemailer.createTestAccount();

        console.log('Ethereal Email Config Created (Add to .env to persist):');
        console.log(`SMTP_HOST=smtp.ethereal.email`);
        console.log(`SMTP_PORT=587`);
        console.log(`SMTP_EMAIL=${testAccount.user}`);
        console.log(`SMTP_PASSWORD=${testAccount.pass}`);

        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    }

    const message = {
        from: `${process.env.FROM_NAME || 'School Admin'} <${process.env.FROM_EMAIL || 'admin@school.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
