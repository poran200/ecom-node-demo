const Repository = require('./reopsitory');
class ProductRepository extends  Repository{
      constructor(fileName) {
          super(fileName);
      }
}
module.exports = new ProductRepository('products.json');
