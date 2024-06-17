const { Sequelize } = require("sequelize");

//database wide options
const opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
};

const connection = new Sequelize(process.env.DATABASE_URL, opts);

connection.authenticate().then(() => {
    console.log("Database connection has been established successfully.");
});

module.exports = connection;