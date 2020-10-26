const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /((http|https):\/\/)(www\.)?([a-zA-Z0-9\-.]{1,150})\.([a-zA-Z]{2,20})([a-zA-Z0-9\-.?@%#]{1,150})?/gm;
        return regex.test(link);
      },
      message: 'Ошибка валидации url',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /((http|https):\/\/)(www\.)?([a-zA-Z0-9\-.]{1,150})\.([a-zA-Z]{2,20})([a-zA-Z0-9\-.?@%#]{1,150})?/gm;
        return regex.test(link);
      },
      message: 'Ошибка валидации imageUrl',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
