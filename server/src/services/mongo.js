const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;
//once is a function of event emmitter that run one time when the the event (open) is happened
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    //this determines how Mongoose parsses that connection string into URL (MONGO_URL)
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}
module.exports = { mongoConnect, mongoDisconnect };
