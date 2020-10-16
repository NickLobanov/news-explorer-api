const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
});