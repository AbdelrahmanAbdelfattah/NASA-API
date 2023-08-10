const http = require("http");

const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

// by passing app as an argument to http.createServer(), you are essentially telling Node.js
// to use your Express app to handle incoming HTTP requests. The HTTP server instance will listen
//  for incoming requests and forward them to the appropriate route handlers and middleware defined in your Express app.
const server = http.createServer(app);

//once is a function of event emmitter that run one time when the the event (open) is happened
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const MONGO_URL =
  "mongodb+srv://nasa-api:DbL41bUbOkLo1Klr@nasacluster.ul9mdcg.mongodb.net/NASACluster?retryWrites=true&w=majority";

async function startServer() {
  // it returns a promise so we use await here
  await mongoose.connect(MONGO_URL, {
    //this determines how Mongoose parsses that connection string into URL (MONGO_URL)
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
