const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    let flag;
    if (req.session.uid) {
        flag = 1;
    }
    res.render('index', {
        flag
    });
});

module.exports = router;