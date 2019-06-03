const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema(
  {
    name: String,
    username: String,
    needs: [{
      type: Schema.Types.ObjectId,
      ref: 'Need'
    }]
  },
  {collection: "Users"}
);

module.exports = mongoose.model("User", User)
