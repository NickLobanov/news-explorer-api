const Article = require('../models/article');
const BadRequestError = require('../middlewares/errors/bad-req-err');
const NotFoundError = require('../middlewares/errors/not-found-err');
const Forbidden = require('../middlewares/errors/forbidden');

module.exports.getArticle = (req, res, next) => {
  Article.find({})
    .then((articleData) => {
      if (!articleData) {
        throw new Error();
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
        throw new BadRequestError('Введены некоректные данные');
      }
      res.status(200).send(newArticle);
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет карточки с таким ID');
      }
      if (article.owner !== req.user._id) {
        throw new Forbidden('Недостаточно прав');
      }
      res.status(200).send('Карточка удалена');
    })
    .catch(next);
};
