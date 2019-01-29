export function getRandomElementFromArray(list: Array<any>) {

  return list[ Math.floor(Math.random() * list.length )];

}


// => sort an array of objects by key with the ability to reverse it
export function sortArrayOfObjectsByKey(key: string, reverse: boolean) {
  // copied from Stack Overflow:
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value#answer-23385176

  /*
    Move smaller items towards the front or back of the array
    depending on if we want to sort the array in reverse order or not.
  */
  const moveSmaller = reverse ? 1 : -1;

  /*
    Move larger items towards the front or back of the array
    depending on if we want to sort the array in reverse order or not.
  */
  const moveLarger = reverse ? -1 : 1;

  return function (secondItem: Object, firstItem: Object) {
    if (secondItem[key] < firstItem[key]) return moveSmaller;
    if (secondItem[key] > firstItem[key]) return moveLarger;
    return 0;
  }
}
