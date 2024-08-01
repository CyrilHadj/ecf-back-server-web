"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Commande = sequelize.define("Commande", {
    isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});
module.exports = Commande;
