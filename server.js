const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// var db = require("./models");

const app = express();
const PORT = process.env.PORT || 3007;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();
const sess = {
    secret: 'secretthing',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore ({
        db: sequelize
    })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("we're in"));
});