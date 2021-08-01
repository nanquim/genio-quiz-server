const express = require('express');
const router = express.Router();
const quiz = require('../resources/quiz.json');

router.get('/', (req, res) => {
    res.send('<p>Não há nada aqui</p>')
});

router.get('/quiz', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*")
    res.json(quiz);
});


module.exports = router;
