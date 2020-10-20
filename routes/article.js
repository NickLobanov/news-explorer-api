const express = require('express');
const { getArticle, postAtricle, deleteArticle } = require('../controllers/article');

const router = express.Router();

router.get('/articles', getArticle);
router.post('/articles', postAtricle);
router.delete('/articles/articleId', deleteArticle);

module.exports = router;
