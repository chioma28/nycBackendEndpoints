const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const transporter = nodemailer.createTransport(mailGun(auth));

const auth = {
        auth: {
            api_key: 'ACCESS_TOKEN_SECRET',
            domain: ''
        }
    };


    const sendMail = (name, email, subject, text, cb) => {
        const mailOptions = {
            sender: name,
            from: email,
            to: 'ganiyuomotayo2000@email.com',
            subject: subject,
            text: text
        };
    
        transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, data);
            }
        });
    
    // Exporting the sendmail
    module.exports = sendMail;
    }