const express = require('express');
const mogoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

// Подкючение к серверу mongo
mogoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
