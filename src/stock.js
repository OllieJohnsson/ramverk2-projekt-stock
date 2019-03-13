const fetch = require("node-fetch");


const randomAroundZero = function() {
    return Math.random() > 0.5 ? 1 : -1;
}


const getStockPrice = function(input) {
    let startingPoint = input.price;
    let rate = input.rate;
    let variance = input.variance;

    return startingPoint * rate + variance * randomAroundZero();
}


const getData = async () => {
    let url = "https://proj-api.olliej.me/objects";
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        return error;
    }
};


const updatePrices = async (objects) => {
    let url = "https://proj-api.olliej.me/updatePrice";

    return await Promise.all(objects.map(async object => {
        let price = getStockPrice(object);
        let params = JSON.stringify({objectId: object.id, price: price});

        try {
            const response = await fetch(url, {
                method: "PUT",
                body: params,
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const json = await response.json();
            return json;
        } catch (error) {
            return error;
        }
    }));
};


module.exports = {
    getData,
    updatePrices
};
