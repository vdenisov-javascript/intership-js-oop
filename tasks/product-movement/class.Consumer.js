const helpers = require('./helpers');


const weakmapRequiredProductsTodayBy = new WeakMap();

class Consumer {

  // public
  get countOfRequiredProductsToday() {
    return weakmapRequiredProductsTodayBy.get(this);
  }
  set countOfRequiredProductsToday(value) {
    return weakmapRequiredProductsTodayBy.set(this, value);
  }

  constructor() {
    this.minimumNeed = 70;
    this.maximumNeed = 120;

    this.countOfRequiredProductsToday = 0;
  }

  // public
  requireProductsAgain(amount = 0) {
    const count = amount || helpers.generateRandomRange(
      this.minimumNeed, this.maximumNeed
    );
    // final cost is classified !!!
    this.countOfRequiredProductsToday = count;
  }

}


module.exports = {
  Consumer
};
