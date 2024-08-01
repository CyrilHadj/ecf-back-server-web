const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Employe = sequelize.define("Employe", {
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
});

module.exports =  Employe;