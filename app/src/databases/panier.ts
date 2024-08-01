const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Client = require("./client")
const Employe = require("./employe")

const Panier = sequelize.define("Panier");

Employe.belongsToMany(Panier, {through : "Commande"});
Panier.belongsToMany(Employe, {through : "Commande"});

Panier.hasMany(Client);
Client.belongsTo(Panier);

module.exports =  Panier;