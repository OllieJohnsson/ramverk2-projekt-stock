const stock = {

    randomAroundZero: function() {
        return Math.random() > 0.5 ? 1 : -1;
    },

    getStockPrice: function(input) {
        let startingPoint = input.price;
        let rate = input.rate;
        let variance = input.variance;

        return startingPoint * rate + variance * this.randomAroundZero();
    }
};


module.exports = stock;
