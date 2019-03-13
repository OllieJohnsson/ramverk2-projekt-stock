const app = require("express")();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const stock = require("./stock");
const PORT = process.env.REALTIME_PORT || 4321;



io.on('connection', client => {
    console.log("A user connected!");


    // client.on('objects', data => {
    //     console.log(data);
    //     objects = data
    // });
    // client.on('disconnect', () => { msg: "disconnected" });
});




stock.getData().then(res => {
    // console.log(res);
    // returnData(res.data);

    let objects = [];

    setInterval(function() {
        if (objects === undefined || objects.length == 0) {
            res.data.map(object => {
                let price = stock.getStockPrice(object);
                stock.updatePrice(object.id, price).then(res => {
                    objects.push(res);
                })
            });
        } else {
            objects.map(object => {
                let price = stock.getStockPrice(object);
                stock.updatePrice(object.id, price).then(res => {
                    return object;
                })
            });
        }
        console.log("Sending back data");
        io.emit("stocks", objects);
    }, 5000);
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

// function returnData(objects) {
//     setInterval(function() {
//         objects.map(object => {
//             object.startingPoint = stock.getStockPrice(object);
//             stock.updatePrice(object.id, object.startingPoint).then(() => {
//                 return object;
//             })
//         });
//         io.emit("stocks", objects);
//     }, 5000);
// }
// setInterval(function() {
//     objects.map(object => {
//         object.startingPoint = stock.getStockPrice(object);
//         return object;
//     });
//     io.emit("stocks", objects);
// }, 5000);


server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
