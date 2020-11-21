const {getLastPrice} = require("../client");
const {updateTargetPrice} = require("../client");

exports.post = (req, res, next) => {
   console.log("#########################")
    var userID = req.body.userID;
    var targetPrice = req.body.targetPrice;
    var operation = req.body.Operation;
    var stockID = req.body.stockID
    updateTargetPrice(userID, targetPrice, operation, stockID)
    res.end()

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
    var lastPrice = getLastPrice()
   res.status(200).send(lastPrice);
 };
  
 exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota GET com ID! ${id}`);
 };