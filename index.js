let http = require('http');
let url = require('url');
const path = require('path');
const fs = require('fs')

var server = http.createServer((req, res) => {

    const whatWGUrl = new URL(req.url, `http://${req.headers.host}`);

    var contentType = '';
    const {
        pathname,
        search
    } = whatWGUrl;

    const absolute_path_to_file = path.join(__dirname, pathname)

    fs.readFile(absolute_path_to_file,'binary', (err, data) => {
        if (err) {
			//console.log(err);
			if (err.code == 'ENOENT') {
				// file does not exist - we should return a 404 status code
                //console.log('404 error getting ' + pathname);
                if (content)
				res.writeHead(404, {
					"Content-Type": "text/plain"
				});
				res.end('404: age Not Found!');
			} else if (err.code == 'EISDIR') {
				// this is actually a directory - we should create a directory listing
				//console.log('directory listing ' + pathname);
				fs.readdir(absolute_path_to_file, (err, files) => {
					if (err) {
						res.writeHead(500, {
							"Content-Type": "text/plain"
						});
						res.end('Server Error 500');
					}
					let s = '<b>Directory Listing</b><br>';
					files.forEach((i) => {
						s += (i + "<br>");
					});
					res.writeHead(200, {
						"Content-Type": "text/plain"
					});
					res.end(s, 'utf8');
				});
			}
		} else {
			// If we get to here, 'data' should contain the contents of the file
			res.writeHead(200, contentType);
			fs.createReadStream('./Devin.html').pipe(res)
			res.end(data, 'binary', () => {
				//console.log("file delivered: " + pathname);
			});
		}
	});
});

var port = 8080;
server.listen(port, () => {
    console.log('listening on ' + port);
});