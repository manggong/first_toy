const express = require("express");
const path = require("path");
const session = require("express-session");
const indexRouter = require('./routes/index.js');
const joinRouter = require('./routes/join.js');
const loginRouter = require('./routes/login.js');
const gameRouter = require('./routes/game')

const app = express();

// view engine 세팅
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 사용 미들웨어
app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
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

// 사용 라우터
app.use('/', indexRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/game', gameRouter);

// 서버 리슨
app.listen(3000, () => {
    console.log("server listen 3000");
});