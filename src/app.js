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


// stock.getData().then(res => {
//     let objects = [];
//     setInterval(function() {
//         stock.updatePrices(objects === undefined || objects.length == 0 ? res.data : objects).then(updated => {
//             objects = updated;
//             io.emit("stocks", objects);
//         });
//     }, 5000);
// });





setInterval(function() {
    stock.getData().then(res => {
        stock.updatePrices(res.data).then(objects => {
            io.emit("stocks", objects);
        });
    });
}, 2000);







server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
