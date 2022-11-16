const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '159PooK159.',
    database: 'project_mobile',
})
app.get('/bts', (req, res) => {
    db.query("SELECT * FROM station_bts where id != 49", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});
app.get('/mrt', (req, res) => {
    db.query("SELECT * FROM station_mrt", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});
app.get('/direcBts', (req, res) => {
    db.query("SELECT * FROM station_bts", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});
app.get('/travelBts', (req, res) => {
    db.query("SELECT * FROM travel", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});
app.get('/costs', (req, res) => {
    db.query("SELECT * FROM costs", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});
app.get('/img_travel', (req, res) => {
    db.query("SELECT * FROM img_travel", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})
