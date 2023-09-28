const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const nodemailer = require('nodemailer');
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// make sure all env variables are set to avoid errors when trying to send an email
let exit = false;
if(process.env.MAIL_USER === undefined || process.env.MAIL_USER === "") {
    console.log("MAIL_USER not set, exiting...")
    exit = true;
}
if(process.env.MAIL_PASS === undefined || process.env.MAIL_PASS === "") {
    console.log("MAIL_PASS not set, exiting...")
    exit = true;
}
if(exit) {
    process.exit(1)
}



app.post('/sendContactMail', (req, res) => {
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