

var http = require('http');
var fs = require('fs');
var url = require('url');

// Create Node.js server
http.createServer(function (req, res) {

    fs.readFile('myDemoWebpage.html', function(err, data) {
      currentUrl = url.parse(req.url, true);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data); // Print info to the client-side
      return res.end();
    });
  
  }).listen(6543);

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

try {
    await client.connect();
    const db = client.db('myDemoDb');
    const collection = db.collection('myDemoCollection');

    // Find the first document in the collection
    const first = await collection.findOne();
    console.log(first);

} finally {
    await client.close();
}
//run().catch(console.error);
