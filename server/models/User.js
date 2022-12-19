const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', schema);
