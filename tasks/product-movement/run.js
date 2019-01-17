const { Maker } = require('./class.Maker');
const { Consumer } = require('./class.Consumer');
const { Agent } = require('./class.Agent');

const helpers = require('./helpers');

// ######################### //

function getStatisticOfMovementProduct(numberOfDays) {
  const Bob = new Maker();
  const Alice = new Consumer();
  const Garfild = new Agent();

  const totalStatistic = [];

  for (let day = 0; day < numberOfDays; day++) {

    Bob.createProductsAgain();
    const makerCreatedToday = Bob.countOfCreatedProductsToday;
    const makerCreatedLast3Days = Bob.getLastDaysCreatedCount(3);

    Alice.requireProductsAgain();
    const consumerRequiredToday = Alice.countOfRequiredProductsToday;

    const availableResources = helpers.trimNumberToLimit(
      makerCreatedToday, consumerRequiredToday
    );

    Garfild.deliverProductsAgain(availableResources);
    const agentDeliveredToday = Garfild.countOfDeliveredProductsToday;
    const agentDeliveredLast3Days = Garfild.getLastDaysDeliveredCount(3);

    const agentEfficiencyFactor = helpers.roundToSpecifiedPrecision(
      (agentDeliveredToday / Garfild.maximumLoadCapacity), 2
    );

    const statisticPerDay = {
      currentDay: day + 1,

      makerCreatedToday,
      consumerRequiredToday,
      agentDeliveredToday,

      makerCreatedLast3Days,
      agentDeliveredLast3Days,

      agentEfficiencyFactor: `${agentEfficiencyFactor * 100} %`
    };

    totalStatistic.push(statisticPerDay);
  }

  return totalStatistic;
}

// ######################### //

if (require.main === module) {
  const Table = require('cli-table3');

  const statisticTable = new Table({
    head: [
      'Current\nday',

      'Maker created\ntotay',
      'Consumer required\ntoday',
      'Agent delivered\ntotay',

      'Maker created\nlast 3 days',
      'Agent delivered\nlast 3 days',

      'Agent efficiency\nfactor'
    ]
  });

  const staticticData = getStatisticOfMovementProduct(days = 10);

  for (let row of staticticData) {
    statisticTable.push([
      row.currentDay,

      row.makerCreatedToday,
      row.consumerRequiredToday,
      row.agentDeliveredToday,

      row.makerCreatedLast3Days,
      row.agentDeliveredLast3Days,

      row.agentEfficiencyFactor
    ]);
  }

  console.log(statisticTable.toString());
}


module.exports = {
  getStatisticOfMovementProduct
};
