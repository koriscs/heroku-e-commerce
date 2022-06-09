const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/controller');
const passport = require('passport');
const { checkAuthenticated, initialize, checkNotAuthenticated} = require('../../passport');


//const initializePassport = require("../passport");
initialize(passport);

userRouter.get("/register", controller.registerPage,  (req, res) => {});
userRouter.post("/register", controller.registerUser, (req, res)=>{})

//userRouter.get("/login", controller.loginPage, (req, res) => {});

userRouter.post("/login", passport.authenticate("local"), controller.loginPage, (req, res)=>{});

//userRouter.get("/dashboard", checkNotAuthenticated,controller.getDashboard, (req, res) =>{})

userRouter.get("/logout", checkAuthenticated,controller.logout, (req, res) =>{})

userRouter.get("/:userId", checkAuthenticated,controller.getUser, (req, res) =>{});


module.exports = userRouter;