var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {

  fs.readFile('myDemoWebpage.html', function(err, data) {
    currentUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data); // Print info to the client-side
    return res.end();
  });

}).listen(6543);
