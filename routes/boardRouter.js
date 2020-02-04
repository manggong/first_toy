const express = require('express');
const router = express.Router();
const con = require('../db_con');

router.get('/', (req, res) => {
    let search = req.query.search;
    let list = req.query.list;
    let flag;
    if (req.session.uid) flag = 1;
    if (!list) list = 1;
    if (!search) search = '';
    con.query(`SELECT * FROM board WHERE title LIKE ${con.escape('%'+search+'%')} COLLATE utf8_bin ORDER BY time DESC`, (err, result) => {
        if (!result) result = '';
        res.render('board', {
            result,
            list,
            selected: 0,
            flag,
            search
        });
    });
});

router.get('/show', (req, res) => {
    let search = '';
    let list = req.query.list;
    let no = req.query.no;
    let flag;
    if (req.session.uid) flag = 1;
    if (!list) list = 1;
    con.query(`SELECT * FROM board WHERE no=${con.escape(no)}`, (err, result) => {
        con.query(`UPDATE board SET hit='${result[0].hit+1}' WHERE no=${con.escape(no)}`, (err) => {
            res.render('board', {
                result,
                list,
                selected: 1,
                flag,
                search
            });
        });
    });

});
router.get('/write', (req, res) => {
    let search = '';
    let list = req.query.list;
    let flag;
    if (req.session.uid) flag = 1;
    res.render('board', {
        result: 0,
        list,
        selected: 2,
        flag,
        search
    });
})

router.post('/register', (req, res) => {
    if (!req.body.title || !req.body.content) {
        res.json({
            message: "내용을 입력하세요",
            flag: 0
        });
    } else if (!req.session.uid) {
        res.json({
            message: "로그인이 필요한 서비스입니다.",
            flag: 0
        });
    } else {
        con.query(`INSERT INTO board (title, content, name, id) VALUES(${con.escape(req.body.title)},${con.escape(req.body.content)},${con.escape(req.session.name)},${con.escape(req.session.uid)})`, (err) => {
            if (err) {
                res.json({
                    message: "등록에러!!!",
                    flag: 0
                });
            } else {
                res.json({
                    message: "등록이 완료되었습니다",
                    flag: 1
                });
            }
        });
    }
})
module.exports = router;