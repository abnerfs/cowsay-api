const fs = require('fs')
const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 9239;

const template = fs.readFileSync('cow-template.txt', 'utf8');

const cowSay = (message) => {
    const line = "-".repeat(message.length + 2);
    return template.replace('{{TEXT}}', message)
        .replaceAll('{{LINE}}', line);
}

const requestListener = (req, res) => {
    const { query } = url.parse(req.url, true);
    const msg = (query && query.message) || 'Hello stranger!';
    res.writeHead(200);
    res.end(cowSay(msg));
}

const server = http.createServer(requestListener);
server.listen(PORT);