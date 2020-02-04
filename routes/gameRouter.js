const express = require('express')
const router = express.Router();
const con = require('../db_con');

router.get('/', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag: 0
    });
});

router.get('/1', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag: 1
    });
});

router.post('/1', (req, res) => {
    let name = req.session.name;
    let id = req.session.uid;
    let score = req.body.serverscore;
    if (name === undefined) {
        res.json({
            message: `로그인을 하시면 랭킹 등록이 가능합니다.`
        });
    } else {
        con.query(`INSERT INTO game1 (name, id, score) VALUES ('${name}', '${id}', '${score}')`, (err, result) => {
            if (err) throw err;
            res.json({
                message: `${name}님의 점수는 ${score}점 입니다.`
            });
        });
    }
});


router.get('/2', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag: 2
    });
})

router.post('/2', (req, res) => {
    let name = req.session.name;
    let id = req.session.uid;
    let score = req.body.score;
    if (name === undefined) {
        res.json({
            message: `로그인을 하시면 랭킹 등록이 가능합니다.`
        })
    } else {
        con.query(`INSERT INTO game2 (name, id, score) VALUES ('${name}', '${id}', '${score}')`, (err, result) => {
            if (err) throw err;
            res.json({
                message: `${name}님의 점수는 ${score}점 입니다.`
            });
        });
    }
});

router.get('/3', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag: 3
    });
})

router.post('/3', (req, res) => {
    let name = req.session.name;
    let id = req.session.uid;
    let score = req.body.score;
    if (name === undefined) {
        res.json({
            message: `로그인을 하시면 랭킹 등록이 가능합니다.`
        })
    } else {
        con.query(`INSERT INTO tetris (name, id, score) VALUES ('${name}', '${id}', '${score}')`, (err, result) => {
            if (err) throw err;
            res.json({
                message: `${name}님의 점수는 ${score}점 입니다.`
            });
        });
    }
});


module.exports = router;