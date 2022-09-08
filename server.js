const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/');

var db = require("./models");

const app = express();
const PORT = process.env.PORT || 3007;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const helpers = require('./utils/helpers');

require('dotenv').config();
const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore ({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require(routes));


db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("We're in",
        PORT,
        PORT
        )
    });
});

module.exports = app;