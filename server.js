require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

// Salting
const saltRounds = 10;
const app = express();
app.set('view engine','ejs');


//  ----------------- use section----------------

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// -----------mongoose section--------------//

mongoose.connect('mongodb://127.0.0.1:27017/usersDB');
const userSchema = new mongoose.Schema({
    userName : String,
    password : String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// using hash function 
const User = mongoose.model("User", userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
// using google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
},
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
// -----------Get / Post section-------------------

app.get("/",function(req,res){
    res.render("home");
})

app.get("/login",function(req,res){
    res.render("login");
})

app.get("/register",function(req,res){
    res.render("register");
});




app.post("/login",function(req,res){
    const user = new User({
        username:req.body.username,
        password: req.body.password
    })

    req.login(user,function(err){
        if (err) {
            console.log(err);
        }else{
            passport.authenticate("login")(req, res, function () {
                res.render("secrets");
            })
        }
    })
})

app.post("/register",function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
        if (err) {
            console.log(err);
            res.redirect("/register");
        }else{
            passport.authenticate("local")(req, res, function () {
                res.render("secrets");
            });
        }
    })
})


// -----------listen section------------------------

app.listen(3000,(req,res)=>{
    console.log('Server has started at port 3000');
})