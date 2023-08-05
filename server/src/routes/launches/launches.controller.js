const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  //validation

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  // in the date object there is a function .toString convert date to string and check if it is valid it will return this date
  // if not it will return "Invalid Date"

  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);

  // 201 (succeeded to create new launch)
  return res.status(201).json(launch);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch };
