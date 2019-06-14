var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//router
var LocationRouter = require("./routes/api/main");

//server
var debug = require("debug")("server:server");
var http = require("http");
var port = normalizePort(process.env.PORT || "4000");

//socketIO
var socketIO = require("socket.io");

//db
var db = require("./routes/db/connect");

var app = express();

/// BUG1: fix bug lỗi Access-Control-Allow-Origin khi client get api của server vì thiếu cors header
var cors = require('cors');
app.use(cors());
/// end BUG1.


app.set("port", port);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", LocationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//create server
var server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
var io = socketIO(server);

//hanle socketIO server-client
let interval;
var arrUser = [];
var arrDriver = [];
io.on("connection", socket => {
  //connect
  console.log(socket.id + " client connected");

  //push array user client.
  var obj = { idacc: "", role: "", idsocket: "" };
  obj.idsocket = socket.id;
  arrUser.push(obj);

  // handle event check id account , role , socketid
  socket.on("sendrole", (data) => {
    // console.log(data) // data: id, role
    arrUser.forEach(item => {
      if (item.idsocket == socket.id) {
        item.idacc = data.id;
        item.role = data.role;
        // break;

      }
    });
    console.log(arrUser);
    socket.emit("sendid", socket.id);
  })

  socket.on("datxe", (data) => {
// console.log(data);
    const idsocket = data.id_Socket;
console.log("dat xe ne");
    var flag = 0;
    // console.log(arrUser);
    arrUser.forEach(item => {
      if (item.idsocket == idsocket) {
        flag = 1;
        console.log("da gan cờ");
      }
    })

    if (flag === 0) {
      socket.emit("phanhoidatxe", "!!!!!!!!!!!!!!!")
    }
    else if (flag === 1) {
     var datasend={idTaiXe:data.taixeID,idkhach:data.userID}
      io.emit(data.taixeID, datasend)

    }

  })


  socket.on("nhanchuyen",(data)=>{
  console.log(data);

  io.emit(data.id,data.mess)

  })
  
  socket.on("tuchoichuyen",(data)=>{
io.emit(data.id,{mess: data.mess, Huy:data.Huy})
  })


  //send location driver autopilot.
  interval = setInterval(() => getApiAndEmit(socket), 3000);

  //disconnect splice item in array.
  socket.on("disconnect", () => {
    clearInterval(interval);
    for (var i = 0; i < arrUser.length; i++) {
      if (arrUser[i].idsocket == socket.id) {
        arrUser.splice(i, 1);
        // break;
      }
    }
    console.log(socket.id + " Client disconnected");
  });
});

//hanle emit : GET API location_driver_online send client in SOCKET
const getApiAndEmit = async socket => {
  try {
    const axios = require("axios");
    axios.get("http://localhost:4000/api/location").then(data_data => {
      console.log(data_data.data);
      socket.emit("location_driver_online", data_data.data);
    });
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

//hanle port "server"
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log("Server running address: " + " port: " + port);
}
