const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag:0
    });
});
router.get('/1', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag:1
    });
});
router.get('/2',(req,res)=>{
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag:2
    });
})
router.get('/3',(req,res)=>{
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('game', {
        flag,
        gameflag:3
    });
})


module.exports = router;