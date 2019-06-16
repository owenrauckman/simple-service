const mongoose = require('mongoose');

module.exports = async () => {
  try{
    await mongoose.connect(process.env.MONGO_DB_STRING, { useNewUrlParser: true, dbName: "help" })
  } catch(e){
    console.log(e)
  }
}
