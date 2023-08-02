const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  lunchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  // Array.from take the output from the map and convert it to Array(valid json) because the map is not a Json
  return Array.from(launches.values());
}

module.exports = {
  getAllLaunches,
};
