const express = require("express");
// const { launches } = require("../../models/lunches.model");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

// the slash here / means that we are matching the root
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
