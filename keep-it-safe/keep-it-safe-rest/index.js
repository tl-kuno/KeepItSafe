const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "mysql2934Avenida.",
    database: "keepitsafe"
})

PORT = 4500

app.post('/add-new', (req, res) => {
    console.log(req.body);
    const websiteName = req.body.websiteName;
    const websiteDomain = req.body.websiteDomain;
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO logins (websiteName, websiteDomain, username, password) VALUES (?, ?, ?, ?)", 
            [websiteName, websiteDomain, username, password], 
            (err, result) =>  {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Login Saved!")
                    res.send("Login Saved!")
                }
            }
        );
});

app.get('/view-all', (req, res) => {
    db.query("SELECT * FROM logins", 
    (err, result) =>  {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});


app.listen(port=PORT, () => 
console.log(`Server is running on port ${PORT}`));