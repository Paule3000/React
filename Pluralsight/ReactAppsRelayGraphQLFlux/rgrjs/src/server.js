import express from 'express';

import {MongoClient} from 'mongodb';

let app = express();

app.use(express.static('public'));

let url = 'mongodb://localhost:27017';
const dbName = 'rgrjs';
let db;

// MongoClient.connect(url, (err, client) => {
//     console.log("err: " + err + "db: " + client);
//     if (err) {
//         console.log("Connect: " + err);
//         throw err;
//     }

//     db = client.db('rgrjs');
//     app.listen(3000, () => console.log('listening on port 3000'));
// });

MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
  console.log("Connected successfully to server");

//   const db = client.db(dbName);
    db = client.db(dbName);

    app.listen(3000, () => console.log('listening on port 3000'));
//   insertDocuments(db, function() {
    // findDocuments(db, function() {
    //   client.close();
    // });
//   });
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
