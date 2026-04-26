const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Frontend App</h1>
    <p>Try <a href="/api">/api</a></p>
  `);
});

server.listen(3000, () => console.log("Frontend running on 3000"));