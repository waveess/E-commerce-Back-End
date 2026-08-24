const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the React frontend to communicate with the API
app.use(cors());

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(routes);

// Sync Sequelize models to the database, then start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});