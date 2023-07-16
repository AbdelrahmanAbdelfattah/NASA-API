// this is the express file

const express = require("express");
const planetsRouter = require("./routes/planets/planets.router");
const planetRouter = require("./routes/planets/planets.router.js");

const app = express();

module.exports = app;

app.use(express.json());

app.use(planetsRouter);
