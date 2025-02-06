const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient } =  require('mongodb');


const app = express();
const port = 6543;

app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "", 'myDemoWebpage.html'));
});
const util = require('util');

app.post("/insert", (req, res) => {
    mongo_insert(req.body.db_input).catch(console.dir);
});

app.get("/retrieve", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log("Retrieving data from MongoDB");
    mongo_retrieve().then((result) => {
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server running on port 6543`);
});

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function mongo_insert(new_entry) {
    try {
        const mydatabase = client.db("myDemoDb");
        const mycollection = mydatabase.collection("myDemoCollection");
        // create a document to insert
        const doc = {
            EnteredName: new_entry,
        }
        const result = await mycollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

async function mongo_retrieve() {
    try {
        // define a database and collection on which to run the method
        const database = client.db("myDemoDb");
        const coll = database.collection("myDemoCollection");
        console.log("Sending request to db");
        const distinctValues = await coll.find();
        console.log("Returning from mongo_retrieve()");
        const data = await distinctValues.toArray();
        return data;
    } finally {
        await client.close();
    }
}
