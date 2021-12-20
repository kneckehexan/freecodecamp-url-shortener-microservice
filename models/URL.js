const mongoose = require('mongoose');

// https://stackoverflow.com/questions/28357965/mongoose-auto-increment
const CounterSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const counter = mongoose.model('counter', CounterSchema);

const URLSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: [true, 'Please provide URL'],
    unique: true
  },
  short_url: {
    type: Number
  }
});

URLSchema.pre('save', function(next) {
  var doc = this;
  counter.findByIdAndUpdate({_id: 'reknare'}, {$inc: {seq:1}}, function(error, counter) {
    if(error){
      console.log(error);
      return next(error);
    }
    doc.short_url = counter.seq;
    next();
  })
})

module.exports = mongoose.model('URL', URLSchema);