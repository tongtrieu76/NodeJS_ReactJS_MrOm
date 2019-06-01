var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var LocationRouter = require("./routes/api/location");

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

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", LocationRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
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
var save_IO = { socket: "" };
io.on("connection", socket => {
  save_IO.socket = socket;
  console.log("New client connected");

  interval = setInterval(() => getApiAndEmit(socket), 3000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");

    // send location: token, userID, local_X , local_Y
    socket.on("send_location_driver_online", data => {
      var locations = { AccountID: "", Location_X: "", Location_Y: "" };
      Object.keys(data).map(key => {
        locations.AccountID = data[key].AccountID;
        locations.Location_X = data[key].Location_X;
        locations.Location_Y = data[key].Location_Y;
      });
      //update data for database , userID
      db.Locations.findOne({ AccountID: locations.AccountID }, function(err, data) {
        if (err) {
          console.log(err);
          res.status(500).send();
        } else {
          if (!data) {
            res.status(400).send();
          } else {
            if (locations.local_X) {
              data.Location_X = locations.Location_X;
            }
            if (locations.local_Y) {
              data.Location_Y = locations.Location_Y;
            }

            data.Date = Date();
            // console.log(Date.parse(date_t));
            data.save(function(err, rs) {
              if (err) {
                console.log(err);
                res.status(500).send();
              } else {
                res.send(rs);
              }
            });
          }
        }
      });
    });
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
  console.log("Server running address: "  + " port: " + port);
}
