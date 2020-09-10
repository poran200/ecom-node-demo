const Repository = require('./reopsitory');

class CartsRepository extends Repository{}

module.exports = new CartsRepository('charts.json');
