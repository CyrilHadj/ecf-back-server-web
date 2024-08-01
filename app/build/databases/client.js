"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Client = sequelize.define("Client", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Client;
