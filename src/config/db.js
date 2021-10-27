const mongoose = require('mongoose');

const MONGOURL = process.env.MONGODB;

mongoose.connection.once('open', () => {
  console.log('connecting to db...')
})

mongoose.connection.on('error', () => {
  console.log( "could not connect to db..");
});

const connectDB = async () => {
  await mongoose.connect(MONGOURL);
  console.log("DB connection successful...")
}

const dbDisconnect = async () => {
  await mongoose.disconnect(MONGOURL);
}


module.exports = {
  connectDB,
  dbDisconnect,
}