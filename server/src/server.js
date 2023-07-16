const http = require("http");

const app = require("./app");

const PORT = process.env.PORT || 8000;

// y passing app as an argument to http.createServer(), you are essentially telling Node.js
// to use your Express app to handle incoming HTTP requests. The HTTP server instance will listen
//  for incoming requests and forward them to the appropriate route handlers and middleware defined in your Express app.
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
