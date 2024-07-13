'use strict';
const { Model, DataTypes} = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("./db");

class account extends Model {
    static associate(models) {
        account.hasMany(models.userAddress, { foreignKey: 'id_user' });
        account.hasMany(models.order, { foreignKey: 'id_user' });
        account.hasOne(models.cart, { foreignKey: 'id_user' });
      }
}

account.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        enum: ['m', 'f', 'a'], 
        default: 'm'
    },
    status: {
        type: DataTypes.STRING,
        enum: ['a', 'd', 's', 'c'],
        default: 's'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
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
    birth_date: DataTypes.DATE,
    roles: {
        type: DataTypes.ARRAY(DataTypes.ENUM({
            values: ['ROLE_USER', 'ROLE_STORE_KEEPER', 'ROLE_ADMIN']
        })),
        allowNull: false
    },
    validate_hash: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: connection,
    indexes: [
        {
            unique: true,
            fields: ['id', 'email', 'phone', 'login']
        }
    ],
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