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
    if(name && id && pw)
    {
        con.query(`SELECT * FROM users WHERE id='${id}'`,(err, result)=>{
            if(!result[0])
            {
                con.query(`INSERT INTO users (name, id, pw) VALUES ('${name}', '${id}', '${pw}')`, (err, result) => {
                    if (err) throw err;
                    console.log("1 record inserted");
                    console.log(result);
                    res.json({
                        message: `${name}님 회원가입이 완료되었습니다.`,
                        flag:1
                    });
                });
            }
            else
            {
                res.json({
                    message: `동일한 ID가 존재합니다!!`,
                    flag:0
                });
            }
        })
    }
    else
    {
        res.json({
            message: `내용을 모두 입력하시기 바랍니다`,
            flag:0
        });
    }
});

module.exports = router;