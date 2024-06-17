'use strict';
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class account extends Model {}

account.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_date: DataTypes.DATE
}, {
    sequelize: connection
});

account.addHook("beforeCreate", async (account) => {
    account.password = await bcrypt.hash(account.password, await bcrypt.genSalt(10));
});

account.addHook("beforeUpdate", async (account, options) => {
    if (options.fields.includes("password")) {
        account.password = await bcrypt.hash(account.password, await bcrypt.genSalt(10));
    }
});

module.exports = account;