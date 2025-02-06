const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient =  require('mongodb').MongoClient;


const app = express();
const port = 6543;

app.use(express.static(path.join(__dirname, "")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "", 'myDemoWebpage.html'));
});

app.get("/insert", (req, res) => {
    console.log("Request Recieved");
    mongo_insert(req.query.db_input);
})

app.listen(port, () => {
    console.log(`Server running on port 6543`);
});

const uri = 'mongodb://localhost:27017';

async function mongo_insert(new_entry) {
    console.log("mongo_insert() called")
    // We assign a callback here to connect to the db and insert the entry
    //    before closing the db connection
    MongoClient.connect(uri, function(err, db) {
        console.log("db connection established");

        if (err) throw err;

        const my_db = db.db('myDemoDb');
        const collection = my_db.collection('myDemoCollection');

        // This is an async function call so we asign a callback to check
        //   if we succesfully inserted into the db
        collection.insertOne({
            name: new_entry
          }, function(err, res) {
            
            if (err) throw err;

            console.log(new_entry + " inserted into db");
            db.close();
          });
    })
}
