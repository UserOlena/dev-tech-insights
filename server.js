
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
}));

app.use(routes);

sequelize.sync({ force: true }).then( () => {
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));
})