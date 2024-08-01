"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Panier = require("./panier");
const Product = sequelize.define("Product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});
Product.belongsToMany(Panier, { through: "Panier_Product" });
Panier.belongsToMany(Product, { through: "Panier_Product" });
module.exports = Product;
