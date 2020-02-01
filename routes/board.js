const express=require('express');
const router=express.Router();
const con=require('./db_con');

router.get('/', (req, res)=>{
    let search=req.query.search;
    let list = req.query.list;
    let flag;
    if (req.session.uid) flag = 1;
    if(!list) list=1;
    if(!search) search='';
    con.query(`SELECT * FROM board WHERE title LIKE '%${search}%' COLLATE utf8_bin`,(err,result)=>{
        res.render('board',{result, list, selected:0, flag});
    });
});

router.get('/show',(req,res)=>{
    let list = req.query.list;
    let no =req.query.no;
    let flag;
    if (req.session.uid) flag = 1;
    if(!list) list=1;
    con.query(`SELECT * FROM board WHERE no='${no}'`,(err,result)=>{
        con.query(`UPDATE board SET hit='${result[0].hit+1}' WHERE no='${no}'`,(err)=>{
            res.render('board',{result, list, selected:1, flag});
        });
    });
    
});
router.get('/write',(req,res)=>{
    let list = req.query.list;
    let no =req.query.no;
    let flag;
    if (req.session.uid) flag = 1;
    //session 추가
    res.render('board',{result:0, list, selected:2 ,flag});
})

router.post('/register',(req,res)=>{
    if(!req.body.title || !req.body.content)
    {
        res.json({message:"내용을 입력하세요"});
    }
    else
    {
        con.query(`INSERT INTO board (title, content, name, id) VALUES('${req.body.title}','${req.body.content}','이기훈','rlenfn213')`,(err)=>{
            if(err) throw err;
            else
            {
                res.json({message:"등록이 완료되었습니다"});
            }
        });
    }
})
module.exports=router;