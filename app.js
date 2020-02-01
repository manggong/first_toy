const express=require('express');
const session=require('express-session');
const app=express();
const path=require('path');
const index=require('./routes/index');
const board=require('./routes/board');
const login=require('./routes/login');
const game=require('./routes/game');
const join=require('./routes/join');

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "미녀 강사 전은수",
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',index);
app.use('/board',board);
app.use('/login', login);
app.use('/game', game);
app.use('/join', join);

app.listen(3030,()=>{
    console.log('server start');
})