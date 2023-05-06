const mongoose = require("mongoose");

const connection_url = process.env.CONNECTION_URL;

async function connectDatabase() {
    try {
    //   mongoose.connect("mongodb://127.0.0.1:27017/mongoose-demo");
      mongoose.connect(connection_url)
      console.log("connected");
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = connectDatabase;