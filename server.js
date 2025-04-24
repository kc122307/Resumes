const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (optional: use 'public' folder)
app.use(express.static(path.join(__dirname)));

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        // Configure the transporter (using Gmail SMTP)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Must match the Gmail account
            to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
            replyTo: email, // Let replies go to the sender
            subject: `New message from ${name}: ${subject || 'No Subject'}`,
            text: `From: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
            html: `<h3>New Contact Form Submission</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, '<br>')}</p>`
        };

        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Email error:', err);
                return res.redirect('/#contact?error=true');
            } else {
                console.log('Email sent:', info.response);
                return res.redirect('/#contact?success=true');
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.redirect('/#contact?error=true');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
