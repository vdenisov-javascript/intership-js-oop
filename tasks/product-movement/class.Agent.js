const helpers = require('./helpers');


const weakmapDeliveredProductsTodayBy = new WeakMap();
const weakmapDeliveredProductsTotalBy = new WeakMap();

class Agent {

  // public
  get countOfDeliveredProductsToday() {
    return weakmapDeliveredProductsTodayBy.get(this);
  }
  set countOfDeliveredProductsToday(value) {
    return weakmapDeliveredProductsTodayBy.set(this, value);
  }

  // public
  get countOfDeliveredProductsTotal() {
    return weakmapDeliveredProductsTotalBy.get(this);
  }
  set countOfDeliveredProductsTotal(value) {
    return weakmapDeliveredProductsTotalBy.set(this, value);
  }

  constructor() {
    this.maximumLoadCapacity = 100;

    this.countOfDeliveredProductsToday = 0;
    this.countOfDeliveredProductsTotal = [];
  }

  // public
  deliverProductsAgain(amount = 0) {
    const count = helpers.trimNumberToLimit(
      amount, this.maximumLoadCapacity
    );
    // delivery route is classified !!!
    this.countOfDeliveredProductsToday = count;
    this.countOfDeliveredProductsTotal.push(count);
  }

  // public
  getLastDaysDeliveredCount(days = 3) {
    return this.countOfDeliveredProductsTotal
      .slice( -1 * days )
      .reduce( (a, b) => a + b );
  }

}


module.exports = {
  Agent
};
