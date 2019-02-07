const _ = require('lodash');


class Consumer {

  constructor() {
    this.minNeed = 70;
    this.maxNeed = 120;

    this.countRequiredToday = 0;
  }

  requireProductsAgain() {
    const count = _.random(this.minNeed, this.maxNeed);
    // final cost is classified !!!
    this.countRequiredToday = count;
  }

  getCountRequiredToday() {
    return this.countRequiredToday;
  }

}


module.exports = Consumer;
