require('dotenv').config();

const nodemailer = require('nodemailer');


const sendEmailHelper = (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USERGMAIL,
          pass: process.env.PASSWORDGMAIL
        }
      });
      
    const mailOptions = {
        from: 'mibanco.ripley.desafio@gmail.com',
        to,
        subject,
        html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmailHelper
}