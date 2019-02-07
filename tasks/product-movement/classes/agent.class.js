const _ = require('lodash');


class Agent {

  constructor() {
    this.maxLoadCapacity = 100;

    this.countDeliveredToday = 0;
    this.countDeliveredTotal = [];
  }

  deliverAsMuchAsPossible(countMakerCreated, countConsumerRequired) {
    const theoryCount = _.min([countMakerCreated, countConsumerRequired]);
    const practiceCount = _.min([theoryCount, this.maxLoadCapacity]);
    // delivery route is classified !!!
    this.countDeliveredToday = practiceCount;
    this.countDeliveredTotal.push(practiceCount);
  }

  getCountDeliveredToday() {
    return this.countDeliveredToday;
  }

  getLastDaysDeliveredCount(days = 3) {
    return this.countDeliveredTotal
      .slice( -1 * days )
      .reduce( (a, b) => a + b );
  }

  calculateEfficiency() {
    return (this.countDeliveredToday / this.maxLoadCapacity);
  }

}


module.exports = Agent;
