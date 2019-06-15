const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema(
  {
    name: String,
    username: String,
    needs: Array,
    abilities: Array,
    catalog: Array,
  },
  {collection: "Users"}
);

module.exports = mongoose.model("User", User)
