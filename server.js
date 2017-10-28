"use strict";

const http = require("http");

let handleReq = (req, res) => {
  console.log(`Received req for URL: ${req.url}`);
  res.writeHead(200);
  res.end(`Hello World`);
};

let www = http.createServer(handleReq);
www.listen(8080);
