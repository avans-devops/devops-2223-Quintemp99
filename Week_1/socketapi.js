const io = require("socket.io")();
const sockerapi = {
    io:io
}

const client = require('prom-client');
const gauge = new client.Gauge({name: "number_of_clients", help:"number of clients that connected using socket.io"});

io.on("connection", function(socket){
    console.log("A user connected");
    gauge.inc(1);

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
        gauge.dec(1);
    });
});

module.exports = sockerapi;