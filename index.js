require('dotenv').config()
const path = require('path')
const nodemailer = require('nodemailer')
const nodemailerMjml = require('nodemailer-mjml')
const hbs = require('nodemailer-express-handlebars')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})

// const hbsOptions = {
//     viewEngine: {
//         partialsDir: 'views',
//         layoutsDir: 'views',
//         defaultLayout: 'baseMessage'
//     },
//     viewPath: 'views'
// }

// transporter.use('compile', hbs(hbsOptions))

transporter.use('compile', nodemailerMjml.nodemailerMjmlPlugin({
    templateFolder: path.resolve('views'),
}));

function sendEmail(to, subject, template, context) {
    const mailOptions = {
        from: 'gdbackup71@gmail.com',
        to,
        subject,
        templateLayoutName: template,
        templateData: context,
        templateLayoutSlots: {
            header: "partials/header",
            content: "partials/content",
            footer: "partials/footer",
        },
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log('Error: ', err)
        } else {
            console.log('Message sent successfully!')
        }
    })
}

sendEmail('gdbackup71@gmail.com', 'Dynamic Email Template with Handlebars', 'invitation', {
    userName: 'John Doe',
    last_name: "John",
    first_name: "Doe",
    data: [
        { client: "client_1", total: "20" },
        { client: "client_2", total: "22" },
        { client: "client_3", total: "23" },
        { client: "client_4", total: "24" },
        { client: "client_5", total: "25" },
        { client: "client_6", total: "26" },
    ]
})


// mjml -r invitation.mjml -o invitation.html