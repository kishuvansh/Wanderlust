if (process.env.NODE_ENV != 'production') {
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
const MongoStore = require('connect-mongo').MongoStore;
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
const dbUrl = process.env.ATLAS_URL;
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});
store.on("error", (err) => {
    console.log(" Mongo session store error", err);
});
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
}

main()
    .then(() => {
        console.log('connected to Db');
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(dbUrl);
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
    res.locals.mapTilerKey = process.env.MAPTILER_KEY || "";// MapTiler API key

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
