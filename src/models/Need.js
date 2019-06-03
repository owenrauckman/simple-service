const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Need = Schema(
  {
    title: String,
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    remote: Boolean,
    description: String,
    startDate: String, // todo, could be date
    endDate: String, // todo, could be date
    weight: Number,
  },
  {collection: "Needs"}
);

module.exports = mongoose.model("Need", Need)