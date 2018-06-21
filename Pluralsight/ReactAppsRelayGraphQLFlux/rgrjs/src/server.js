import express from 'express';

import {MongoClient} from 'mongodb';

let app = express();

app.use(express.static('public'));

let url = 'mongodb://localhost:27017/rgrjs';
let db;

MongoClient.connect(url, (err, database) => {
    console.log("err: " + err + "db: " + database);
    if (err) {
        console.log("Connect: " + err);
        throw err;
    }

    db = database;
    app.listen(3000, () => console.log('listening on port 3000'));
});

app.get("/data/links", (req, res) => {
    db.collection("links").find({}).toArray((err, links) => {
        if (err) {
            console.log("collection: " + err);
            throw err;
        }

        console.log(links);
        res.json(links);
    })
});
