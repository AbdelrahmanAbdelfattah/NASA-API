const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
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

function httpAbortLaunch(req, res) {
  // because it is a string
  const launchId = Number(req.params.id);

  // if launch doesn't exist
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({ error: "Launch not found" });
  }

  //if launch already exists
  const aborted = abortLaunchById(launchId);

  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
