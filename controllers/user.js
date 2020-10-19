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
