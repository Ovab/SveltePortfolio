const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config()
const nodemailer = require('nodemailer');
const app = express()
const port = 3000

app.use(bodyParser.json());

app.post('/sendContactMail', (req, res) => {
        console.log("send mail: ", process.env.MAIL_PASSWORD);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            replyTo: req.body.email,
            subject: 'Nieuw contact formulier van ' + req.body.naam,
            text: 'Van ' + req.body.email + ':\n\n' + req.body.bericht
        };


        transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("send mail error: ", error, process.env.MAIL_PASSWORD);
                    res.status(500)

                    res.send("errorcode21SHITISGOOFED")
                    res.end()
                    return null;
                } else {
                    res.status(200)

                    res.send('succes')

                    res.end();
                }
            }
        )
    }
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})