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
db.StockHistory = require("../models/stockHistory")(sequelize, DataTypes);
db.Product_image = require("../models/productimage")(sequelize, DataTypes);
db.Order = require("../models/order")(sequelize, DataTypes);
db.Order_product = require("../models/orderproduct")(sequelize, DataTypes);
db.account = require("../models/account");
db.User_addresses = require("../models/useraddress")(sequelize, DataTypes);
db.cart = require("../models/cart");
db.cartProduct = require("../models/cartproduct");
db.Newsletter = require('../models/newsletter')

// db.Manufacturer = require("../models/manufacturer")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
