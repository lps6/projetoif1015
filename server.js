const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("stock.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const stockPackage = grpcObject.stockPackage;
const PubNub = require("pubnub");

var stocks = {};
var historico = 5;
let users = {};

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(stockPackage.StockPrice.service,
    {
        "getStockPrice": getStockPrice,
        "join": join,

    });

server.start();

function join(call, callback) {
    if (!(call.request.userID in users)){
        users[call.request.userID] = [call, call.request.symbol];
  }else{
    users[call.request.userID].push(call.request.symbol)
  }
}

function updatePrice(stock) {
    let stockPrice = stocks[stock][stocks[stock].length-1][0]
    var Price = {
        "symbol": stock,
        "price": stockPrice
    }
    for (var user in users){
        if (users[user].includes(stock)){
            users[user][0].write(Price);
        }
    }
}

function getStockPrice (call, callback){
    let stockPrice = stocks[call.request.value][stocks[call.request.value].length-1][0]
    const Result = {
        "value": stockPrice
    }
    callback(null, Result);

}

var pubnub = new PubNub({
    subscribe_key: 'sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe'
    });
    pubnub.addListener({
    message: function(message) {
    if (message.message.symbol in stocks){
        stocks[message.message.symbol].push([message.message.bid_price, message.message.order_quantity]);
        if (stocks[message.message.symbol].length > historico){
            stocks[message.message.symbol].shift()
        }
        
    }else{
        stocks[message.message.symbol] = [[message.message.bid_price, message.message.order_quantity]];
    }
    updatePrice(message.message.symbol)
    //console.log(users);
    }
    });
    pubnub.subscribe({
    channels: ['pubnub-market-orders']
    });
