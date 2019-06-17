const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema(
  {
    name: String,
    username: String,
    location: {
      type: Object,
      state: {
        type: String,
        default: '',
      },
    },
    needs: [{
      type: Schema.Types.ObjectId,
      ref: 'Need'
    }],
    abilities: [{
      type: Schema.Types.ObjectId,
      ref: 'Ability'
    }],
  },
  {collection: "Users"}
);

module.exports = mongoose.model("User", User)
