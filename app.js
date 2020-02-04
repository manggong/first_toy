const indexRouter = require('./routes/indexRouter');
const boardRouter = require('./routes/boardRouter');
const loginRouter = require('./routes/loginRouter');
const gameRouter = require('./routes/gameRouter');
const joinRouter = require('./routes/joinRouter');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', indexRouter);
app.use('/board', boardRouter);
app.use('/login', loginRouter);
app.use('/game', gameRouter);
app.use('/join', joinRouter);

app.listen(3030, () => {
    console.log('server start');
})