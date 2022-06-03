const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
const bcrypt = require('bcrypt');
const queries = require('./src/queries');


function initialize(passport) { 
    console.log("Initialized");

const authenticateUser = (username, password, done) => {

    pool.query(queries.getUser,[username], async (err, result) =>{

        if (err) return done(err);
        if (!result.rows.length) return done(null, false);

        const user = result.rows[0];
        const matchedPassword = await bcrypt.compare(password, user.password);
        
        if(!matchedPassword) {
            return done(null, false);
        }
        return done(null, user);
    })
}


passport.use( new LocalStrategy( authenticateUser));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) =>{
    pool.query(queries.selectById, [id], (err, result) =>{
        if (err) throw err;
        const user = result.rows[0];

        return done(null, user);

        })
    });    

}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
        res.status(401).json({msg: "You need to login!"})
    }
    
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }

module.exports =  {
    initialize,
    checkAuthenticated,
    checkNotAuthenticated
};


