const app = require("express")();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const stock = require("./stock");
const PORT = process.env.REALTIME_PORT || 4321;

let objects = [];
io.on('connection', client => {
    console.log("A user connected!");
    client.on('objects', data => {
        objects = data
    });
    client.on('disconnect', () => { msg: "disconnected" });
});

// let cakes = [
//     {
//         name: "kaka1",
//         startingPoint: 20,
//         rate: 1.002,
//         variance: 0.6
//     },
//     {
//         name: "kaka2",
//         startingPoint: 30,
//         rate: 1.001,
//         variance: 0.3
//     }
// ];


setInterval(function() {
    objects.map(object => {
        object.price = stock.getStockPrice(object);
        return object;
    });
    io.emit("stocks", objects);
}, 5000);


server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
