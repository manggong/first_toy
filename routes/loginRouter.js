const con = require('../db_con');
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {

    const id = req.body.id;
    const pw = req.body.pw;

    con.query(`SELECT name, id, pw FROM users WHERE id=${con.escape(id)} AND pw=${con.escape(pw)}`, function (err, result) {
        if (err) throw err;
        console.log(result[0]);
        if (result[0]) {
            req.session.name = result[0].name;
            req.session.uid = id;
            const name = result[0].name
            res.json({
                message: `${name}님 안녕하세요`,
                flag: 1
            });
        } else {
            res.json({
                message: `다시 로그인 해주세요`,
                flag: 0
            });
        }
    });
});

router.get('/out', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;