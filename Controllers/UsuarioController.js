const {getLastPrice} = require("../client");

exports.post = (req, res, next) => {
    res.status(201).send('Rota POST!');
 };
  
 exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Rota PUT com ID! --> ${id}`);
 };
  
 exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota DELETE com ID! --> ${id}`);
 };
  
 exports.get = (req, res, next) => {
   console.log("##############")
    var lastPrice = getLastPrice()
    console.log("###############"+lastPrice)
    res.status(200).send(lastPrice);
 };
  
 exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota GET com ID! ${id}`);
 };