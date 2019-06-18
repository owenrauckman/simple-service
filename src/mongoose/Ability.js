const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ability = Schema(
  {
    title: String,
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
    searchable: Boolean,
    remote: Boolean,
    description: String,
    startDate: Date,
    endDate: Date,
  },
  {collection: "Abilities"}
);

module.exports = mongoose.model("Ability", Ability)
