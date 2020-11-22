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

notifications = {}

function getLastPrice(){
  return stocks
}

function notifyUser(){
  
}

function updateTargetPrice(userID, targetPrice, operation, stockID){
  if (stockID in notifications){
    notifications[stockID+userID].push([targetPrice, operation]);
}else{
  notifications[stockID+userID] = [[targetPrice, operation]];
}  
  client.join({ symbol: stockID, userID: userID}, res => {});
}


const client = new stockPackage.StockPrice("localhost:40000", 
grpc.credentials.createInsecure())


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
  }  }

recieveUpdates();

module.exports = {getLastPrice, updateTargetPrice};