const helpers = require('./helpers');


const weakmapCreatedProductsTodayBy = new WeakMap();
const weakmapCreatedProductsTotalBy = new WeakMap();

class Maker {

  // public
  get countOfCreatedProductsToday() {
    return weakmapCreatedProductsTodayBy.get(this);
  }
  set countOfCreatedProductsToday(value) {
    return weakmapCreatedProductsTodayBy.set(this, value);
  }

  // public
  get countOfCreatedProductsTotal() {
    return weakmapCreatedProductsTotalBy.get(this);
  }
  set countOfCreatedProductsTotal(value) {
    return weakmapCreatedProductsTotalBy.set(this, value);
  }

  constructor() {
    this.minimumProduction = 50;
    this.maximumProduction = 150;

    this.countOfCreatedProductsToday = 0;
    this.countOfCreatedProductsTotal = [];
  }

  // public
  createProductsAgain(amount = 0) {
    const count = amount || helpers.generateRandomRange(
      this.minimumProduction, this.maximumProduction
    );
    // manufacturing technology is classified !!!
    this.countOfCreatedProductsToday = count;
    this.countOfCreatedProductsTotal.push(count);
  }

  // public
  getLastDaysCreatedCount(days = 3) {
    return this.countOfCreatedProductsTotal
      .slice( -1 * days )
      .reduce( (a, b) => a + b );
  }

}


module.exports = {
  Maker
};
