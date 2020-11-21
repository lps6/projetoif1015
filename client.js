const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("stock.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockPackage = grpcObject.stockPackage;
const PubNub = require("pubnub");


const client = new stockPackage.StockPrice("localhost:40000", 
grpc.credentials.createInsecure())


function recieveUpdates() {
    let channel = client.join({ symbol: "Apple", userID: 1});
   
    channel.on("data", onData);
   
  }

  function onData(stock) {
    console.log(`${stock.symbol}: ${stock.price}`);
  }

recieveUpdates();