"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.panierRouter = void 0;
const express = require("express");
exports.panierRouter = express.Router();
const Panier = require("../databases/panier");
const Client = require("../databases/client");
const Product = require("../databases/product");
exports.panierRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const client = await Client.findByPk(body.clientId)
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    const product = await Product.findByPk(body.productId)
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    client.addPanier(product);
    reponse.status(200).json("Panier has been created");
});
exports.panierRouter.get("/:clientId", async (request, reponse) => {
    const clientId = request.params.clientId;
    const client = await Client.findByPk(clientId)
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    const panier = client.getpaniers();
    reponse.status(200).json(panier);
});
