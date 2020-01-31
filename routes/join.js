const con = require('./db_con');
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('join');
});

//회원가입 요청이 들어 올 때
router.post('/', (req, res) => {

    const name = req.body.name;
    const id = req.body.id;
    const pw = req.body.pw;
    const sql = `INSERT INTO users (name, id, pw) VALUES ('${name}', '${id}', '${pw}')`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(result);
        res.json({
            message: `${name}님 회원가입이 완료되었습니다.`
        });
    });


});

module.exports = router;