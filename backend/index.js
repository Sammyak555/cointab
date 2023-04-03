const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { connection } = require('./Config/db');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("welcome to the cointab backend project")
})

app.get('/users', (req, res) => {
    connection.query('SELECT * from users', async (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.send(results)
        }
    })
})

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results[0]) {
            res.send("User already registered !")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    console.log(err)
                } else {
                    connection.query('INSERT INTO users SET ?', { email: email, password: hash }, (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send("user Registered, please login!");
                        }
                    })
                }
            });
        }
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
       await connection.query('SELECT * FROM users WHERE email = ?', [email], (error, user) => {
            if (user[0]) {
                const isBefore=(date1, date2)=> {
                    return date1 > date2;
                  }
                  const now = new Date();
                  const d1 = user[0].blocked_until;
                  const d2 = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                bcrypt.compare(password, user[0].password, async (err, result) => {
                    if(err){
                        res.send(err)
                    }else if (result) {
                        if(isBefore(d1, d2)===true||user[0].blocked_until==null){
                            // console.log(isBefore())
                        var token = jwt.sign({ userID: user[0].id }, 'newuser');
                        connection.query(`UPDATE users SET login_attempts = 0, last_login_attempt = NULL, blocked_until = NULL WHERE id = ${user[0].id}`)
                        res.send({ "msg": "Logged in !", "usertoken": token, "user": user[0].email })

                        }else{
                            res.send(`You are blocked till ${d1}`)
                        }
                    } else{
                        const now = new Date();
                        const attempts = Number(user[0].login_attempts) + 1;
                        const lastAttempt = user[0].last_login_attempt || now;
                        const blockedUntil = attempts >= 5 ?  Date.now(): null;
                        connection.query('UPDATE users SET login_attempts = ?, last_login_attempt = ?, blocked_until = ? WHERE id = ?', [attempts, lastAttempt, blockedUntil, user[0].id])
                        res.send("Authentication Failed Invalid Credentials!")
                    }
                });
            } else {
                 res.send("Authentication Failed!")
            }
        })
    }catch (err) {
            res.send(err)
        }
    })


app.listen(process.env.port, async (req, res) => {
    try {
        await connection;
        console.log("Connected to db");
    } catch (err) {
        console.log(err);
    }
    console.log(`Running on port ${process.env.port}`);

});