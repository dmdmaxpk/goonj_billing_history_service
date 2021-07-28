const config = require("../config");
var nodemailer = require('nodemailer');

sendEmail = async(subject,text,email) => {
    this.transporter = nodemailer.createTransport({
        host: config.emailhost,
        port: config.emailPort,
        secure: config.emailSecure, // true for 465, false for other ports
        auth: {
          user: config.emailUsername, // generated ethereal user
          pass: config.emailPassword // generated ethereal password
        }
    });

    await transporter.sendMail({
        from: 'paywall@dmdmax.com.pk',
        to: email,
        subject: subject,
        text: text,
    });
}

module.exports = {
    sendEmail: sendEmail
};