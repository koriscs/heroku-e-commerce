const express = require('express');
const app = express();
 require('dotenv').config();
const pool = require('./database');
const port = 3000;
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');


const userRouter = require('./src/routes/routes');
const addressRouter = require('./src/routes/addressrouter');
const productRouter = require('./src/routes/productrouter');
const cartRouter = require('./src/routes/cartrouter');
const orderRouter = require('./src/routes/orderrouter');

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
        maxAge: 1000*60*60,
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
app.use('/addresses', addressRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);

app.listen(port, ()=> {
    console.log(`App is listening on 3000`);
})
