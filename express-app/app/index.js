const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app).listen(3000);

app.get("/", (req, res) => {
  res.send("this request is kew");
});

process.on("SIGINT", function (code) {
  console.log("SIGINT received...");
  server.close();
});

process.on("SIGTERM", function (code) {
  console.log("SIGTERM received...");
  server.close();
});
console.log("server started");
