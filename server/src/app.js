// this is the express file

const express = require("express");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.router");

const app = express();

module.exports = app;

// Cross-Origin (or Cross-Origin Resource Sharing - CORS) is a security feature implemented by web browsers
// to restrict web pages from making requests to a different domain than the one that served the web page.
// It is a fundamental security concept of the Same-Origin Policy (SOP), which helps prevent malicious websites
// from accessing sensitive data on other websites.
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(planetsRouter);
