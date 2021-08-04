const config = require("../config");
var nodemailer = require('nodemailer');

sendEmail = async(subject, text, email) => {
    this.transporter = nodemailer.createTransport({
        host: config.emailConfig.host,
        port: config.emailConfig.port,
        secure: config.emailConfig.secure, // true for 465, false for other ports
        auth: {
          user: config.emailConfig.username, // generated ethereal user
          pass: config.emailConfig.password // generated ethereal password
        }
    });

    await transporter.sendMail({
        from: config.emailConfig.from,
        to: email,
        subject: subject,
        text: text,
    });
}

module.exports = {
    sendEmail: sendEmail
};