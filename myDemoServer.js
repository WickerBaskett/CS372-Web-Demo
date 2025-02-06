const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient } =  require('mongodb');


const app = express();
const port = 6543;

app.use(express.static(path.join(__dirname, "")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "", 'myDemoWebpage.html'));
});

app.get("/insert", (req, res) => {
    console.log("Request Recieved: " + req.query.db_input);
    mongo_insert(req.query.db_input).catch(console.dir);
})

app.listen(port, () => {
    console.log(`Server running on port 6543`);
});

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function mongo_insert(new_entry) {
    console.log("mongo_insert() called")
    try {
        const mydatabase = client.db("myDemoDb");
        const mycollection = mydatabase.collection("myDemoCollection");
        console.log(new_entry);
        // create a document to insert
        const doc = {
            test: 'new_entry',
        }
        const result = await mycollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
