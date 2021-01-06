const { text } = require('body-parser');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();

const auth = {
    auth: {
        api_key:'129342af71078b5ccdd95cd44e197552-4879ff27-1c5710ad',
        domain: 'sandbox412a73c095824843955056f376fddb65.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendEmail = ( fullName, email, title, message, to, ) => {
    const mailOptions = {
        from: email,
        to: to,
        subject: subject,
        html: text,
        text: message
    };
    transporter.sendEmail(mailOptions, (err, info) => {
        if (err) {
          console.log(`Error: ${err}`);
           
        }
        else {
          console.log(`Response: ${info}`);
            // cb(null, info);
        }
      }
    );
}

module.exports = sendEmail;