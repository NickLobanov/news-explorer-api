const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((userData) => {
      if (!userData) {
        res.status(404).send('Нет пользователя и таким ID');
      }
      res.status(200).send(userData);
    })
    .catch(next);
};

module.exports.createNewUser = (req, res, next) => {
  const {
    email,
    name,
  } = req.body;
  bcrypt.hash(req.body.password, 15)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new Conflict('Пользователь с таким email уже создан');
      }
    })
    .then((userData) => {
      if (!userData) {
        throw new BadRequestError('Некорректно введены данные');
      }
      res.status(200).send({
        _id: userData._id,
        email: userData.email,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Ошибка авторизации');
      }
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }) });
    })
    .catch(next);
};
