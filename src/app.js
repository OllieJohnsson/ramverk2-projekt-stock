const app = require("express")();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const stock = require("./stock");
const PORT = process.env.REALTIME_PORT || 4321;


io.on('connection', client => {
    console.log("A user connected!");

    stock.getData().then(data => {
        console.log(data);
        io.emit("stocks", data);
    })

    client.on('disconnect', () => {
        console.log("A user disconnected!");
    });
});


const update = () => {
    stock.getData().then(data => {
        stock.updatePrices(data).then(objects => {
            io.emit("stocks", objects);
        });
    })
}


setInterval(update, 60000);


server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
