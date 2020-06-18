const mongoose = require("mongoose");
const config = require('./default')

console.log(config.mongoDBURI)

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDBURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
