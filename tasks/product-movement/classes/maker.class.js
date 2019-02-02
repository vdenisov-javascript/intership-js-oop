const _ = require('lodash');


class Maker {

  constructor() {
    this.minProds = 50;
    this.maxProds = 150;

    this.countCreatedToday = 0;
    this.countCreatedTotal = [];
  }

  createProductsAgain() {
    const count = _.random(this.minProds, this.maxProds);
    // manufacturing technology is classified !!!
    this.countCreatedToday = count;
    this.countCreatedTotal.push(count);
  }

  getCountCreatedToday() {
    return this.countCreatedToday;
  }

  getLastDaysCreatedCount(days = 3) {
    return this.countCreatedTotal
      .slice( -1 * days )
      .reduce( (a, b) => a + b );
  }

}


module.exports = Maker;
