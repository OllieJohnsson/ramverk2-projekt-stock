const app = require("express")();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const stock = require("./stock");
const PORT = process.env.REALTIME_PORT || 4321;


io.on('connection', client => {
    console.log("A user connected!");
    client.on('event', data => { msg: "hej" });
    client.on('disconnect', () => { msg: "disconnected" });
});

let cakes = [
    {
        name: "kaka1",
        startingPoint: 20,
        rate: 1.002,
        variance: 0.6
    },
    {
        name: "kaka2",
        startingPoint: 30,
        rate: 1.001,
        variance: 0.3
    }
];

setInterval(function() {
    cakes.map(cake => {
        cake.startingPoint = stock.getStockPrice(cake);
        return cake;
    });
    io.emit("stocks", cakes);
}, 5000);


server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
