const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.DataTypes = DataTypes; //krl
db.sequelize = sequelize;

db.Category = require("../models/category")(sequelize, DataTypes);
db.Product = require("../models/product")(sequelize, DataTypes);
db.Manufacturer = require("../models/manufacturer")(sequelize, DataTypes);
db.Stock = require("../models/stock")(sequelize, DataTypes);
db.ProductImage = require("../models/productimage")(sequelize, DataTypes);

// db.Manufacturer = require("../models/manufacturer")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
