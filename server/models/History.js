const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  inventions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Invention'
    }
  ]
});

const History = mongoose.model('History', historySchema);

module.exports = History;