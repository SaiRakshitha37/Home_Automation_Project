const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

// Password Strength Validator
const validatePasswordStrength = (password) => {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const letterRegex = /[a-zA-Z]/;

    if (password.length < minLength) {
        return 'Password must be at least 8 characters long';
    }
    if (!specialCharRegex.test(password)) {
        return 'Password must contain at least one special character';
    }
    if (!letterRegex.test(password)) {
        return 'Password must contain at least one letter';
    }
    return null; // Indicates the password is strong
};

router.post('/register', async (req, res) => {
    const { username, password, confirmPassword, phoneNumber, email } = req.body;

    // Check if the passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Validate password strength
    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
        return res.status(400).json({ message: passwordError });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            phoneNumber,
            email,
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyPattern.username) {
                return res.status(400).json({ message: 'Username is already taken' });
            } else if (err.keyPattern.email) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username); // Log username

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { password: hashedPassword, ...userWithoutPassword } = user.toObject();

        res.json({ message: 'Login successful', user: userWithoutPassword });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No user found with this email.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        // HTML Email Content
        const htmlContent = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .email-container {
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    h1 {
                        color: #333;
                        font-size: 24px;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #555;
                    }
                    .button {
                        background-color: #007bff;
                        color: white;
                        padding: 10px 20px;
                        font-size: 16px;
                        border-radius: 5px;
                        text-decoration: none;
                        display: inline-block;
                        margin-top: 20px;
                    }
                    .button:hover {
                        background-color: #0056b3;
                    }
                    .footer {
                        font-size: 14px;
                        color: #777;
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h1>Password Reset Request</h1>
                    <p>Hi ${user.username},</p>
                    <p>You requested a password reset. Please click the button below to reset your password:</p>
                    <a href="${resetUrl}" class="button">Reset Password</a>
                    <p>If you did not request this, please ignore this email. The link will expire in 1 hour.</p>
                    <div class="footer">
                        <p>Best regards,</p>
                        <p>HomeMatic</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.App_Name,
                pass: process.env.App_Password,
            },
        });

        const mailOptions = {
            from: {
                    name: 'HomeMatic',
                    address: process.env.App_Name,
            },
            to: user.email,
            subject: 'Password Reset Request',
            html: htmlContent, // Send HTML content instead of plain text
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset link has been sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Reset Password Route (Validates token and allows user to set a new password)
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Validate password strength
    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
        return res.status(400).json({ message: passwordError });
    }

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.json({ message: 'Password has been successfully reset.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/change-password/:userId', async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const { userId } = req.params;

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Validate password strength
    const passwordError = validatePasswordStrength(newPassword);
    if (passwordError) {
        return res.status(400).json({ message: passwordError });
    }

    try {
        const user = await User.findOne({ "_id": userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/change-email/:userId', async (req, res) => {
    const { userId } = req.params;
    const { currentEmail, newEmail, confirmNewEmail } = req.body;

    if (newEmail !== confirmNewEmail) {
        return res.status(400).json({ message: 'Emails do not match' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.email !== currentEmail) {
            return res.status(400).json({ message: 'Current email is incorrect' });
        }

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return res.status(400).json({ message: 'New email is already in use' });
        }

        user.email = newEmail;
        await user.save();

        res.status(200).json({ message: 'Email changed successfully' });
    } catch (err) {
        console.error('Error changing email:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userData = await User.find({ "_id": userId });
        console.log({ userData });
        res.status(200).json({ userData });
    } catch (err) {
        console.error("Error fetching user data:", err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
