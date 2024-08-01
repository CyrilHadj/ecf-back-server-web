import { json, Op } from "sequelize";

const express = require("express");

export const productRouter = express.Router();

const Product = require("../databases/product");


productRouter.post("/", async (request, reponse)=>{
    const body = request.body;

    const product = await Product.create({
        name : body.name,
        price : body.price
    })
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })

  
    reponse.status(200).json("Product created")
    });

productRouter.get("/all", async (request, reponse)=>{

    const product = await Product.findAll()
    .catch(error=>{
        console.log(error)
        reponse.status(500).json("Error has occured")
    })

    reponse.status(200).json(product)
});

productRouter.delete("/:id", async (request, reponse)=>{
   
    const product = await Product.findByPk(request.params.id)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    if(product){
        product.destroy({
            where : {
                id : product.id
            }
        })
        reponse.status(200).json("product has been deleted")
    }else{
        reponse.status(400).json("product do not exist")
    };
});

productRouter.put("/", async (request, reponse)=>{
    const body = request.body;

    const product = await Product.findByPk(body.id)
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    if(product){
    product.name = body.name;

    await product.save()
    .catch(error=>{
        console.log(error),
        reponse.status(500).json("Error has occured")
    })
    reponse.status(200).json("product has been update")
    }else{
        reponse.status(400).json("product do not exist")
    }
});

