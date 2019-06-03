const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = Schema(
  {
    name: String,
    related: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }],
  },
  {collection: "Categories"}
);

module.exports = mongoose.model("Category", Category)
