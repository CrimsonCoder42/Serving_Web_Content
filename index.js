let http = require('http');
let url = require('url');
const path = require('path');
const fs = require('fs')

var server = http.createServer((req, res) => {


    const whatWGUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log(whatWGUrl)


    const {
        pathname,
        search
    } = whatWGUrl;

    console.log(search)

    res.writeHead(200);
    res.write('Hello World!');
    res.end();

    const absolute_path_to_file = path.join(__dirname, pathname)

    fs.readFile(absolute_path_to_file, (err, data) => {
        if (err) {
            console.log(err);
            if (err.code == 'ENOENT') {
                // file does not exist - we should return a 404 status code

            } else if (err.code == 'EISDIR') {
                // this is actually a directory - we should create a directory listing

            }
        }
        // If we get to here, 'data' should contain the contents of the file

    });

});

var port = 8080;
server.listen(port, () => {
    console.log('listening on ' + port);
});