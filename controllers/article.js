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

module.exports.postAtricle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  })
    .then((newArticle) => {
      if (!newArticle) {
        res.status(500).send('Ошибка');
      }
      res.status(200).send(newArticle);
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        res.status(404).send('нет карточки с таким ID');
      }
      res.status(200).send('Карточка удалена');
    })
    .catch(next);
};
