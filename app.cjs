const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const nodemailer = require('nodemailer');
const mysql = require("mysql2");
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// make sure all env variables are set to avoid errors when trying to send an email
let exit = false;
if (process.env.MAIL_USER === undefined || process.env.MAIL_USER === "") {
    console.log("MAIL_USER not set, exiting...")
    exit = true;
}
if (process.env.MAIL_PASS === undefined || process.env.MAIL_PASS === "") {
    console.log("MAIL_PASS not set, exiting...")
    exit = true;
}
if (exit) {
    process.exit(1)
}

const conn = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// check if DB not ded
conn.connect(function (err) {
    if (err) throw err;
});


// get all projects
app.post('/getProjects', async (req, res) => {
    // moest promise gebruiken omdat anders de query niet klaar was voor de return
    function query(werk = 0) {
        return new Promise((resolve, reject) => {
            conn.execute(
                "SELECT projects.name as projName, projects.from, projects.to, korteBeschrijving, langeBeschrijving, img, alt, giturl, weburl, werk, Tags.name as tagName, Tags.color FROM `projects` JOIN Tags_has_projects on `projects`.`id` = `projects_id` JOIN `Tags` on `Tags_has_projects`.`Tags_id` = `Tags`.`id` where werk = ?",
                [werk], // Pass the parameter as an array here
                function (err, results, fields) {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                    return results
                }
            )
        });
    }

    const werkRes = await query(1);
    const projectsRes = await query(0);

    res.send({
        werk: werkRes,
        projects: projectsRes
    })
});


// dashboard stuff
app.post('/getTags', async (req, res) => {
    // moest promise gebruiken omdat anders de query niet klaar was voor de return
    function query() {
        return new Promise((resolve, reject) => {
            conn.execute(
                "SELECT * FROM `Tags`",
                function (err, results, fields) {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                    return results
                }
            )
        });
    }

    const tagsRes = await query();

    res.send({
        tags: tagsRes
    })
});


app.post('/addProject', async (req, res) => {
    function queryProjInsert() {
        return new Promise((resolve, reject) => {
            conn.execute(
                "INSERT INTO `projects` (`name`, `from`, `to`, `korteBeschrijving`, `langeBeschrijving`, `img`, `alt`, `giturl`, `weburl`, `werk`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    req.body.name,
                    req.body.from,
                    req.body.to,
                    req.body.korteBeschrijving,
                    req.body.langeBeschrijving,
                    req.body.img, req.body.alt,
                    req.body.giturl,
                    req.body.weburl,
                    req.body.werk
                ],
                function (err, results, fields) {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                    return results
                }
            )
        });
    }

    function queryTagsInsert(){
        return new Promise((resolve, reject) => {
            conn.execute(
                "INSERT INTO `Tags_has_projects` (`Tags_id`, `projects_id`) VALUES (?, ?)",
                [
                    req.body.tag,
                    req.body.id
                ],
                function (err, results, fields) {
                    if (err) {
                        reject(err)
                    }
                    resolve(results)
                    return results
                }
            )
        });
    }

    const tagsRes = await queryProjInsert();

    res.send({
        tags: tagsRes
    })
});


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
            } else {
                res.status(200)

                res.send('succes')

                res.end();
            }
            return null;
        }
    )
});

app.listen(port, () => {
    console.log(`Listening on: ${port}`)
})