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

var lastPrice = "sssssssssssssssss"

function getLastPrice(){
  console.log("#################################### " + stocks)
  return stocks
}


const client = new stockPackage.StockPrice("localhost:40000", 
grpc.credentials.createInsecure())


function recieveUpdates() {
    let channel = client.join({ symbol: "Apple", userID: 1});
   
    channel.on("data", onData);

    rl.on("line", function(text) {
      client.join({ symbol: text, userID: 1}, res => {});
    });
   
  }

  function onData(stock) {
    console.log(`${stock.symbol}: ${stock.price}`);
    console.log(stocks);
    if (stock.symbol in stocks){
      stocks[stock.symbol].push(stock.price);
      if (stocks[stock.symbol].length > 20){
          stocks[stock.symbol].shift()
      }
      
  }else{
      stocks[stock.symbol] = [stock.price];
  }  }

recieveUpdates();

module.exports = {getLastPrice};