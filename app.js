const express = require('express');
const bodyParser = require('body-parser');
const mogoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { createNewUser, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createNewUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use(auth);

app.use('/', userRouter);
app.use('/', articleRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
