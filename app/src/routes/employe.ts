import { json, Op } from "sequelize";

const express = require("express");

export const employeRouter = express.Router();

const Employe = require("../databases/employe");


employeRouter.post("/", async (request, reponse)=>{
    const body = request.body;

    const employe = await Employe.create({
        name : body.name
    })
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })

  
    reponse.status(200).json("Employe has been add")
    });

employeRouter.get("/all", async (request, reponse)=>{
    const body = request.body;

    const employe = await Employe.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("Error has occured")
    })

    reponse.status(200).json(employe)
});

employeRouter.delete("/:id", async (request, reponse)=>{
   
    const employe = await Employe.findByPk(request.params.id)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    if(employe){
        Employe.destroy({
            where : {
                id : employe.id
            }
        })
        reponse.status(200).json("employe has been deleted")
    }else{
        reponse.status(400).json("employe do not exist")
    };
});

employeRouter.put("/", async (request, reponse)=>{
    const body = request.body;

    const employe = await Employe.findByPk(body.id)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    if(employe){
    employe.name = body.name;

    await employe.save()
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    reponse.status(200).json("employe has been update")
    }else{
        reponse.status(400).json("employe do not exist")
    }
});

employeRouter.get("/product/:employeId", async (request,reponse)=>{
    const employeId = request.params.employeId;

    const employe = await Employe.findByPk(employeId)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    });

    const commande = employe.getCommande();
    
    if(commande){
        reponse.status(200).json(commande)
    }else{
        reponse.status(400).json("no commande")
    }

})

