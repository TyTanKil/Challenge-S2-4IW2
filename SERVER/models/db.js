const { Sequelize } = require("sequelize");

//database wide options
const opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
};

const connection = new Sequelize(process.env.DATABASE_URL || 'postgres://techshop_site:3zH659q0fUMW6ve4FXLv@postgres:5432/techshop', opts);

connection.authenticate().then(() => {
  console.log("Database connection has been established successfully.");
});

module.exports = connection;
