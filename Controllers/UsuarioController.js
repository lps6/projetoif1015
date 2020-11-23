const { getLastPrice } = require("../client");
const { updateTargetPrice } = require("../client");
const {notifyUser} = require("../client");
const { CustomObject } = require("../client");

exports.eventHandler = (req, res, next) => {
  
  const headers = {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
    "X-Accel-Buffering": "no"
  };
  res.writeHead(200, headers);

  let intervalId = setInterval(function () {
    var notification = notifyUser();
    //var message = [];
    //message = lastPrice["Google"].toString().split(",");
  // Mandatory headers and http status to keep connection open
    console.log(`*** Interval loop."`);
    // Creates sending data:
    data = JSON.stringify(notification);
    // Note:
    // For avoidance of client's request timeout,
    // you should send a heartbeat data like ':\n\n' (means "comment") at least every 55 sec (30 sec for first time request)
    // even if you have no sending data:
    if (data == undefined) {
       res.write(`:\n\n`)
      }
    else{
      console.log("#########" + data + "#########");
       res.write("data:" + data)
    }
  }, 1000);
  // Note: Heatbeat for avoidance of client's request timeout of first time (30 sec)
  res.write(`:\n\n`);
  //res.end();
};

exports.post = (req, res, next) => {
  var userID = req.body.userID;
  var targetPrice = req.body.targetPrice;
  var operation = req.body.Operation;
  var stockID = req.body.stockID;
  updateTargetPrice(userID, targetPrice, operation, stockID);
  res.json({
    status: 200,
    message: "Recebido com sucesso!"
  });
  res.end();
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
  var lastPrice = getLastPrice();
  res.status(200).send(lastPrice);
};

exports.getById = (req, res, next) => {
  let id = req.params.id;
  res.status(200).send(`Rota GET com ID! ${id}`);
};
