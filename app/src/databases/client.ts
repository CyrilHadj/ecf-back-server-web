const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Client = sequelize.define("Client", {
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
});


module.exports =  Client;