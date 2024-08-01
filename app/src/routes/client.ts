import { json, Op } from "sequelize";

const express = require("express");

export const clientRouter = express.Router();

const Client = require("../databases/client");
const Panier = require("../databases/panier");


clientRouter.post("/", async (request, reponse)=>{
    const body = request.body;

    const client = await Client.create({
        name : body.name
    })
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })

    const panier = await Panier.create({
        client_id : body.id
    })
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })

    reponse.status(200).json("Client has been add")
});

clientRouter.get("/all", async (request, reponse)=>{
    const body = request.body;

    const client = await Client.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("Error has occured")
    })

    reponse.status(200).json(client)
});

clientRouter.delete("/:id", async (request, reponse)=>{
   
    const client = await Client.findByPk(request.params.id)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    if(client){
        Client.destroy({
            where : {
                id : client.id
            }
        })
        reponse.status(200).json("Client has been deleted")
    }else{
        reponse.status(400).json("client do not exist")
    };
});

clientRouter.put("/", async (request, reponse)=>{
    const body = request.body;

    const client = await Client.findByPk(body.id)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    if(client){
    client.name = body.name;

    await client.save()
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    reponse.status(200).json("Client has been update")
    }else{
        reponse.status(400).json("client do not exist")
    }
});

