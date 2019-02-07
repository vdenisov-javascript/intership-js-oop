const _ = require('lodash');

const { Maker, Consumer, Agent } = require('./classes');

// ######################### //

function getStatisticOfMovementProduct (numberOfDays) {
  const Bob = new Maker();
  const Alice = new Consumer();
  const Garfild = new Agent();

  const totalStatistic = [];

  for (let day = 1; day <= numberOfDays; day++) {
    Bob.createProductsAgain();

    Alice.requireProductsAgain();

    Garfild.deliverAsMuchAsPossible(
      Bob.getCountCreatedToday(),
      Alice.getCountRequiredToday()
    );

    const statisticPerDay = {
      currentDay: day,

      createdToday: Bob.getCountCreatedToday(),
      requiredToday: Alice.getCountRequiredToday(),
      deliveredToday: Garfild.getCountDeliveredToday(),

      createdPer3Days: Bob.getLastDaysCreatedCount(3),
      deliveredPer3Days: Garfild.getLastDaysDeliveredCount(3),

      efficiencyFactor: Garfild.calculateEfficiency()
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

  const staticticData = getStatisticOfMovementProduct(10);

  for (let row of staticticData) {
    statisticTable.push([
      row.currentDay,

      row.createdToday,
      row.requiredToday,
      row.deliveredToday,

      row.createdPer3Days,
      row.deliveredPer3Days,

      `${_.round(row.efficiencyFactor * 100)} %`
    ]);
  }

  console.log(statisticTable.toString());
}

module.exports = {
  getStatisticOfMovementProduct
};
