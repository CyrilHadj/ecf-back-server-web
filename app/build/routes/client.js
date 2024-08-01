"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express = require("express");
exports.clientRouter = express.Router();
const Client = require("../databases/client");
const Panier = require("../databases/panier");
exports.clientRouter.post("/", async (request, reponse) => {
    const body = request.body;
    const client = await Client.create({
        name: body.name
    })
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    const panier = await Panier.create({
        client_id: body.id
    })
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    reponse.status(200).json("Client has been add");
});
exports.clientRouter.get("/all", async (request, reponse) => {
    const body = request.body;
    const client = await Client.findAll()
        .catch(error => {
        console.log(error);
        reponse.status(500).json("Error has occured");
    });
    reponse.status(200).json(client);
});
exports.clientRouter.delete("/:id", async (request, reponse) => {
    const client = await Client.findByPk(request.params.id)
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    if (client) {
        Client.destroy({
            where: {
                id: client.id
            }
        });
        reponse.status(200).json("Client has been deleted");
    }
    else {
        reponse.status(400).json("client do not exist");
    }
    ;
});
exports.clientRouter.put("/", async (request, reponse) => {
    const body = request.body;
    const client = await Client.findByPk(body.id)
        .catch(error => {
        console.log(error),
            reponse.status(500).json("Error has occured");
    });
    if (client) {
        client.name = body.name;
        await client.save()
            .catch(error => {
            console.log(error),
                reponse.status(500).json("Error has occured");
        });
        reponse.status(200).json("Client has been update");
    }
    else {
        reponse.status(400).json("client do not exist");
    }
});
