const nodemailer = require("nodemailer");
const layout = require('../models/mails.js');
const sendPassLink = require('../models/mails.js').passLink;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Test.project.simplon@gmail.com',
        pass: 'KevJeanYassMat'
    }
});

exports.contactMail = (req, res) => {
    let html = layout[req.body.layout](req.body);

    let mailOptions = {
        from: req.body.sender,
        to: 'Test.project.simplon@gmail.com',
        subject: `Contact de ${req.body.sender}`,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        } else {
          console.log(info);
            return res.send(info);
        }
    });

    copieMail(req.body.sender, html);
};

copieMail = (to, html) => {
    let mailOptions = {
        from: 'Test.project.simplon@gmail.com',
        to: to,
        subject: 'Copie de votre mail',
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        } else {
          console.log(info);
        }
    });
}

exports.sendMailForPass = (req, res) => {
    let html = sendPassLink(req);

    let mailOptions = {
        from: 'lescouarneckevin@yahoo.fr',
        to: 'Test.project.simplon@gmail.com',
        subject:'Nouveau mot de passe',
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        } else {
            return console.log(info);
        }
    });
};

exports.mailConfirm = (req, res) => {
  console.log(req);
    let html = layout.confirm(req);

    let mailOptions = {
        from: transporter._options.auth.user,
        to: transporter._options.auth.user,
        subject: `Confirmation de votre email`,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        } else {
            return console.log(info);
        }
    });
};
