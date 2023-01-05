const nodemailer = require('nodemailer');
module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `<i>${text}</i>`,
        });
        console.log('email sent successfully');
    } catch (error) {
        console.log('email not sent!');
        console.log(error);
        return error;
    }
};
