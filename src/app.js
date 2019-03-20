const app = require("express")();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const stock = require("./stock");
const PORT = process.env.REALTIME_PORT || 4321;


io.on('connection', client => {
    console.log("A user connected!");

    client.on('disconnect', () => {
        console.log("A user disconnected!");
    });
});



setInterval(function() {
    stock.getData().then(data => {
        stock.updatePrices(data).then(objects => {
            io.emit("stocks", objects);
        });
    })
}, 60000);



server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
