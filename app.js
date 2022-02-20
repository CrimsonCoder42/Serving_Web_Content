var http = require('http');

var server = http.createServer( requestListener );

var port = 8080;
server.listen(port, () => {
  console.log('listening on ' + port);   // using the server.listen() callback to report success starting the server
});