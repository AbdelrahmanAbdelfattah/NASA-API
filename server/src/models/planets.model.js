const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

// createReadStream function return an object
// The output you received is a Buffer object,
// which is a built-in data structure in Node.js used to handle binary data. The
// Buffer object represents a chunk of binary data, such as the content of the CSV
// file you read using the readStream.
// The <Buffer ...> part of the output indicates that it is a Buffer object.
// The following sequence of hexadecimal values represents the raw binary data of the file.
// To convert the Buffer to a string, you can specify the desired encoding when creating the
// readable stream using .createReadStream(). For example, if the CSV file is encoded in UTF-8,
// you can modify your code like this:
// comment option : means treat the line theat starts with # as a comment
//columns option meant take the first row of the file and use it as a keys when you create every object

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planet was found ! `);
        resolve();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}

module.exports = {
  getAllPlanets,
  loadPlanetsData,
};
