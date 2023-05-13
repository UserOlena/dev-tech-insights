
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);

sequelize.sync({ force: true }).then( () => {
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`));
})