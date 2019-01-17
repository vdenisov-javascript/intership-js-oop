function generateRandomRange(min, max) {
  return parseInt( Math.random() * (max - min) + min );
}

function trimNumberToLimit(number, limit) {
  return (number < limit) ? number : limit;
}

function roundToSpecifiedPrecision(number, precision) {
  const x = 10 ** precision;
  return Math.round(number * x) / x;
}


module.exports = {
  generateRandomRange,
  trimNumberToLimit,
  roundToSpecifiedPrecision
};