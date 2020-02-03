const express = require('express')
const router = express.Router();
const con = require('./db_con')

router.get('/', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    con.query(`SELECT * FROM game1 ORDER BY score DESC LIMIT 5`, (err1, game1Result) => {
        con.query(`SELECT * FROM game2 ORDER BY score DESC LIMIT 5`, (err2, game2Result) => {
            con.query(`SELECT * FROM tetris ORDER BY score DESC LIMIT 5`, (err3, tetrisResult) => {
                console.log(game1Result);
                console.log(game2Result);
                console.log(tetrisResult);
                res.render('index', {
                    flag,
                    game1Result,
                    game2Result,
                    tetrisResult
                });
            });
        });
    });
});
module.exports = router;