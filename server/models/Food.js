const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String,
    category: String,
    imageUrl: String,
    price: Number,
    rate: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Food', schema);
