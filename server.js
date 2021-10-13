const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// creating 24 hours from milliseconds
const twoHours = 1000 * 60 * 60 * 2;
const sess = {
  // key: 'users_id',
  secret: 'Super secret secret',
  cookie: {
    maxAge: twoHours
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


 // allows use of session. in handlebars such as #if session.loggedIn
 app.use(session(sess));
 app.use(function (req, res, next) {
     res.locals.session = req.session;
     next();
     
 });
 
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));
app.disable('etag');

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});











