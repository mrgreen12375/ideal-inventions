const mongoose = require('mongoose');

const { Schema } = mongoose;

const inventionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  inventory: {
    type: Number,
    min: 0,
    default: 0
  }
});

const Invention = mongoose.model('Invention', inventionSchema);

module.exports = Invention;