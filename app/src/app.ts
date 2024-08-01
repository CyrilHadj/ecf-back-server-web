const sequelize = require("./databases");
const {Op} = require("sequelize");

const express = require("express");
const app = express();

const cors = require("cors");


app.use(cors());
app.use(express.json());

const {clientRouter} = require("./routes/client");
const {employeRouter} = require("./routes/employe");
const {panierRouter} = require("./routes/panier");
const {productRouter} = require("./routes/product");



app.use("/client", clientRouter);
app.use("/employe", employeRouter);
app.use("/panier", panierRouter);
app.use("/product", productRouter);



app.listen(8000,()=>{
    console.log("Serveur lancé sur localhost:8000")
});
