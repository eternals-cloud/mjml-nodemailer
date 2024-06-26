const mjml = require('mjml');
const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

const mjmlTemplate = fs.readFileSync('./emailTemplates/template.mjml', 'utf-8');

const { html } = mjml(mjmlTemplate);

const template = handlebars.compile(html);

const data = {
    name: 'John Doe'
};

const finalHtml = template(data);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@gmail.com',
    subject: 'Test Email',
    html: finalHtml
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Email sent: ' + info.response);
});
