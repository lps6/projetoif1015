const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("stock.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockPackage = grpcObject.stockPackage;
const PubNub = require("pubnub");

const readline = require('readline');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var stocks = {};

var notifications = {}
var notification = []

function getLastPrice(){
  return stocks
}

function notifyUser(){
  if (notification){
    var message = notification[0]
    notification.shift()
    return message
  }
  else{
    return null
  }
  
}

function updateTargetPrice(userID, targetPrice, operation, stockID){
  if (stockID in notifications){
    notifications[stockID].push(targetPrice);
}else{
  notifications[stockID] = [targetPrice, operation];
}  
  client.join({ symbol: stockID, userID: userID}, res => {});
}


const client = new stockPackage.StockPrice("localhost:40000", 
grpc.credentials.createInsecure());

function checkPrice(symbol, price, list){
  if (list[1] == "compra"){
    if (price <= list[0]){
      notification.push([symbol, price, "compra"])
    }}
  else{
    if (price >= list[0]){
      notification.push([symbol, price, "venda"])
  }

  }}

function recieveUpdates() {
    let channel = client.join({userID: 1});
   
    channel.on("data", onData);
  }

  function onData(stock) {
    //console.log(`${stock.symbol}: ${stock.price}`);
    //console.log(stocks);
    if (stock.symbol in stocks){
      stocks[stock.symbol].push(stock.price);
      if (stocks[stock.symbol].length > 20){
          stocks[stock.symbol].shift()
      }
      
  }else{
      stocks[stock.symbol] = [stock.price];
  }
  if (!(notifications[stock.symbol] == null)){
    checkPrice(stock.symbol, stock.price, notifications[stock.symbol]);
  }
}

recieveUpdates();

module.exports = {getLastPrice, updateTargetPrice, notifyUser};