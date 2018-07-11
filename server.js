const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8080;

http.createServer(app).listen(port, () => console.log(`Listing on port : ${port}`));