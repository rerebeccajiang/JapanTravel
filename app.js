// if we are running in development mode, require the dotenv package
// which will take the key value pair from .env file
// this is different from production
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}


const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const session = require('express-session');
const methodOverride = require('method-override')
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const MongoStore = require('connect-mongo');
// Atlas database or local database
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/japan-travel'
const secret = process.env.SECRET || 'devepomentsecret'

const ExpressError = require('./utils/ExpressError');

// require routes from japango and reviews
const japangoRoutes = require('./routes/japanplaces');
const reviewsRoutes = require('./routes/reviews')
const usersRoutes = require('./routes/users');

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl)
    .then(() => console.log("connection open!"))
    .catch(error => console.log(error));

// there are mutiple engines and we need to tell ejs which one to use
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// serve static assets to public on every route- need to use express middleware
app.use(express.static(path.join(__dirname, 'public')))
// To remove data using these defaults:
app.use(mongoSanitize());
// enable all 11 middlewares
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",

];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
];
// configure helmet
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dvluzn1gq/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// store session in dbUrl
const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60  //updates after 23 hrs
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    // property store allow session to be stored in mongo
    store,
    // do not want to use the default name
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // prevent cookies from been access through client side script
        // cookies are only accessible through http request
        httpOnly: true,
        //https: cookies can only be configured through https
        //secure: true,
        // cookie will expire in a week
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

// middlewares for authentification
app.use(passport.initialize())
// give us persistent log in sessions
// make sure this is after session()
app.use(passport.session())
// we want passport to use LocalStrategy, where the authentification method is coming from user
// i.e. static method that is aleady added in 
passport.use(new LocalStrategy(User.authenticate()))

// this is telling passport how to serizlize user
// how do we store user in the session
passport.serializeUser(User.serializeUser())
// this is how we deserialize user
passport.deserializeUser(User.deserializeUser())

// middleware so that sucess is availble for all routes
app.use((req, res, next) => {
    // req.user: passport attach user to the request
    // we add this to locals so that we have access to this on every request
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

// prefix the routes to simplify URLs
app.use('/japango', japangoRoutes);
app.use('/japango/:id/reviews', reviewsRoutes);
app.use('/', usersRoutes);


app.all("*", (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong"
    res.status(statusCode).render('error', { err })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})