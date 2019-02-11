require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const firebase = require('firebase');

// Initialize Firebase
const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECTID,
    storageBucket: "",
    messagingSenderId: process.env.MSG_SENDER_ID
};

firebase.initializeApp(config);
const db = firebase.firestore();

let results = []

db.collection('leaderboard').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        results.push(doc.data())
        console.log(doc.data())
    });
})

app.get('/', function (req, res) {
    res.send(`RoboMatch Backend`)
});

app.get('/view', function (req, res) {
    res.json(results)
});

app.post('/submit', function (req, res) {
    const name = req.body.name;
    const clicks = req.body.clicks;
    const time = req.body.time
    const mode = req.body.mode
    const cards = req.body.cards
    const target = req.body.target
    const score = req.body.score

    db.collection('leaderboard').add({
        name: name,
        clicks: clicks,
        time: time, 
        mode: mode, 
        cards: cards, 
        target: target, 
        score: score
    }).then(
        res.end("success")
    )
});

app.listen(port, () => console.log(`App listening on port ${port}!`))