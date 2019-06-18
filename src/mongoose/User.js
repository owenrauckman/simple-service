const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema(
  {
    name: String,
    username: String,
    avatar: String,
    about: String,
    industries: Array,
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
    organizations: [{
      type: Schema.Types.ObjectId,
      ref: 'Organization'
    }],
    reviews: [{
      rating: Number,
      reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      description: String,
      date: Date,
    }],
  },
  {collection: "Users"}
);

module.exports = mongoose.model("User", User)
