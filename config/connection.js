const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = process.env.JAWDB_URL
? new Sequelize(process.env.JAWDB_URL)
: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    user: 'me',
    password: 'sqlpassword',
    dialect: 'mysql',
    dialectOptions: {
        decimalNumbers: true,
    },
  });

module.exports = sequelize;