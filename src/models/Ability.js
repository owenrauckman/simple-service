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
    remote: Boolean,
    description: String,
    startDate: String, // todo, could be date
    endDate: String, // todo, could be date
    weight: Number,
  },
  {collection: "Abilities"}
);

module.exports = mongoose.model("Ability", Ability)
