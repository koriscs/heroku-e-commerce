const express = require('express');
const app = express();
 require('dotenv').config();
const pool = require('./database');
const port = 3000;
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const userRouter = require('./src/routes');
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
        pool: pool,
        createTableIfMissing: true,
    }),
    cookie: {
        maxAge: 1000*60*60*24
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>{
   // console.log(req.session);
    //console.log(req.user);
    next();
})

app.get('/', (req, res) =>{
    res.render("index");
});

app.use('/users', userRouter);

app.listen(port, ()=> {
    console.log(`App is listening on 3000`);
})
