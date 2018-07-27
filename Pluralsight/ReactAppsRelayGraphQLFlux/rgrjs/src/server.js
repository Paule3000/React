import "babel-polyfill";

import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';
import { ENGINE_METHOD_CIPHERS } from "constants";

let app = express();
app.use(express.static('public'));

let url = 'mongodb://localhost:27017';
const dbName = 'rgrjs';
let db;

// Error: db.collection is not a function
// 
// Use async feature from stage-0 advanced features
(async() => {
    // let db = await MongoClient.connect(url);
    let client = await MongoClient.connect(url);

    db = client.db(dbName);
    let schema = Schema(db)

    app.use('/graphql', GraphQLHTTP({
        schema,
        graphiql: true
    }));

    app.listen(3000, () => console.log('listening on port 3000'));

    // Generate json schema
    let json = await graphql(schema, introspectionQuery);
    fs.writeFile('./schema/schema.json', JSON.stringify(json, null, 2), err => {
        if (err) throw err;
    
        console.log("JSON schema created.");
    })
})();

// MongoClient.connect(url, (err, client) => {
//     console.log("err: " + err + "db: " + client);
//     if (err) {
//         console.log("Connect: " + err);
//         throw err;
//     }

//     db = client.db('rgrjs');
//     // let db = client.db('rgrjs');

//     app.use('/graphql', GraphQLHTTP({
//         schema: schema(db),
//         graphiql: true
//     }));

//     app.listen(3000, () => console.log('listening on port 3000'));

//     // Generate json schema
//     let json = await graphql(schema, introspectionQuery);
//     fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
//         if (err) throw err;
    
//         console.log("JSON schema created.");
//     })
// });

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
