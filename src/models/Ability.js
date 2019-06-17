const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ability = Schema(
  {
    title: String,
    type: String,
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    searchable: Boolean,
    remote: Boolean,
    description: String,
    startDate: Date,
    endDate: Date,
    weight: Number,
  },
  {collection: "Abilities"}
);

module.exports = mongoose.model("Ability", Ability)
