const mongoose = require('mongoose');

module.exports = async () => {
  try{
    await mongoose.connect('mongodb+srv://owenrauckman:test@help0-4t3w5.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, dbName: "help" })
  } catch(e){
    console.log(e)
  }
}
