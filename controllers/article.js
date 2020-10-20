const Article = require('../models/article');

module.exports.getArticle = (req, res, next) => {
  Article.find({})
    .then((articleData) => {
      if (!articleData) {
        res.status(500).send('Что то пошло не так');
      }
      res.status(200).send(articleData);
    })
    .catch(next);
};
