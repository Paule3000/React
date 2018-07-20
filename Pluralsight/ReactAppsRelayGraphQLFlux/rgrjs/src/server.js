import express from 'express';
import schema from '../data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('public'));

let url = 'mongodb://localhost:27017';
const dbName = 'rgrjs';
let db;

// Use async feature from stage-0 advanced features
// (async() => {
//     let db = await MongoClient.connect(url);

//     app.use('/graphql', GraphQLHTTP({
//         schema: schema(db),
//         graphiql: true
//     }));

//     app.listen(3000, () => console.log('listening on port 3000'));
// })();

MongoClient.connect(url, (err, client) => {
    console.log("err: " + err + "db: " + client);
    if (err) {
        console.log("Connect: " + err);
        throw err;
    }

    db = client.db('rgrjs');

    app.use('/graphql', GraphQLHTTP({
        schema: schema(db),
        graphiql: true
    }));

    app.listen(3000, () => console.log('listening on port 3000'));
});

// MongoClient.connect(url, function(err, client) {
//   console.log("Connected successfully to server");

//     db = client.db(dbName);

//     app.listen(3000, () => console.log('listening on port 3000'));
// });

// app.get("/data/links", (req, res) => {
//     db.collection("links").find({}).toArray((err, links) => {
//         if (err) {
//             console.log("collection: " + err);
//             throw err;
//         }

//         console.log(links);
//         res.json(links);
//     })
// });
