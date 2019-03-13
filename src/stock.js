// const request = require("request");

const fetch = require("node-fetch");

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

const updatePrice = async (objectId, price) => {
    let url = "https://proj-api.olliej.me/updatePrice";
    let params = JSON.stringify({objectId: objectId, price: price});
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
};

async function fetchData() {

    await request("https://proj-api.olliej.me/objects", (error, response, body) => {
        if (!error && response.statusCode == 200) {
          return "JSON.parse(body)";
        }
    });
}

const stock = {

    randomAroundZero: function() {
        return Math.random() > 0.5 ? 1 : -1;
    },

    getStockPrice: function(input) {
        let startingPoint = input.price;
        let rate = input.rate;
        let variance = input.variance;

        return startingPoint * rate + variance * this.randomAroundZero();
    },

    fetchData: fetchData,
    getData,
    updatePrice
};


module.exports = stock;
