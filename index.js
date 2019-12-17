const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

//Connect Mongo client
var MongoClient = require('mongodb').MongoClient;
var db = null;

//id of last posted chirp
var LAST_CHIRP_ID = 2;
///collection of chrips name in database
const CHIRPS = "chirps";

//connect db to chrips
MongoClient.connect('mongodb://localhost:27017/handshake', function (err, client) {
    if (err) throw err

    db = client.db('handshake');

})

//parse requests as json
app.use(express.json());

//setup ejs for templating
app.set('view engine', 'ejs');
app.set('views', './pages')

//host public folder statically
app.use(express.static('public'));

//initial load page
app.get('/index', (req, res) => {
    if (db == null) res.send("Error: Unable to reach database");

    //find all chrips sorting by largest id
    db.collection(CHIRPS).find({}).sort({ 'id': -1 }).toArray(function (err, result) {
        if (err) throw err

        var chirps = [];
        //push chrips to array
        result.forEach(chirp => {
            chirps.push({text:`${chirp.id} -- ${chirp.text.toUpperCase()}`,votes:chirp.votes, id:chirp.id});
        });

        //return template page with filled data
        res.render('index.ejs', { chrips: chirps });
    });
});

app.post('/post', (req, res) => {
    if (db == null) res.send("Error: Unable to reach database");
    console.log("posting");
    console.log(req.body);

    //add new chrip to database
    db.collection(CHIRPS).insertOne({ id: ++LAST_CHIRP_ID, text: req.body.chirp, votes: 0 });

    res.send("success");

    //push notification to all users
    axios.post('https://bellbird.joinhandshake-internal.com/push', {
        chirp_id: LAST_CHIRP_ID
    }).then((res) => {
        console.log(`statusCode: ${res.statusText}`)
    })
});

app.post('/vote', (req, res) => {
    if (db == null) res.send("Error: Unable to reach database");
    console.log("voting");
    console.log(req.body);

    //update chirp with desired id
    db.collection(CHIRPS).updateOne({id:req.body.id}, {$inc:{votes:1}}, function(err, res) {
        if (err) console.log(err);
        // console.log(res);
        console.log("document updated");
    });

    res.send("success");
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server running on port ${port}!`));