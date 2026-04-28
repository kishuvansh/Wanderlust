if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const ExpressError = require("./utils/ExpressError.js");
const mongoose = require('mongoose');
const path = require('path');
const methodeOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Sessions = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require('./models/user.js');
const listingsRouter = require('./route/listings.js');
const reviewRouter = require('./route/review.js');
const UserRouter = require('./route/user.js');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodeOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
}


app.get('/', (req, res) => {
    res.send("Welcome to Wanderlust");
})

main()
    .then(() => {
        console.log('connected to Db');
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.use(Sessions(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;

    next();
})

app.get("/signup", (req, res) => {
    res.render("listings/users/signup");
});
app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', UserRouter);
// reviews-post route to add new reviews related to listings 

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
    console.log("server is running on port 8080");
});
