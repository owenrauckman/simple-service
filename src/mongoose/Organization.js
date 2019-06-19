const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Organization = Schema(
  {
    name: String,
    username: String,
    password: String,
    email: String,
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
    reviews: [{
      rating: Number,
      reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      description: String,
      date: Date,
    }],
    membership: Object, // post MVP
  },
  {collection: "Organizations"}
);

module.exports = mongoose.model("Organization", Organization)
