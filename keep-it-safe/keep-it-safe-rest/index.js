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

app.post('/addnew', (req, res) => {
    console.log(req.body);
    const website = req.body.website;
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO Logins (website, username, password) VALUES (?, ?, ?)", 
            [website, username, password], 
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

app.listen(port=PORT, () => 
console.log(`Server is running on port ${PORT}`));