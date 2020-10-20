const express = require('express');
const mogoose = require('mongoose');
const { createNewUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

const app = express();
const { PORT = 3000 } = process.env;

// Подкючение к серверу mongo
mogoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signup', createNewUser);
app.post('/signin', login);

app.use(auth);

app.use('/', userRouter);
app.use('/', articleRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
