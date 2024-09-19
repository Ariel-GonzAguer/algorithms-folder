const mergeSort = (startArray) => {
  let length = startArray.length;
  if (length === 1) {
    return startArray;
  }

  const mid = Math.floor(length / 2);
  const leftArray = startArray.slice(0, mid);
  const rightArray = startArray.slice(mid, length);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
};

const merge = (leftArray, rightArray) => {
  let sortedArray = [];

  while (leftArray.length > 0 && rightArray.length > 0) {
      leftArray[0] < rightArray[0] ? sortedArray.push(leftArray.shift()) : sortedArray.push(rightArray.shift());
    // if (leftArray[0] < rightArray[0]) {
    //   sortedArray.push(leftArray[0]);
    //   leftArray.shift();
    // } else {
    //   sortedArray.push(rightArray[0]);
    //   rightArray.shift();
    // }
  }
  // Once the while loop has completed, return the sortedArray with leftArray and rightArray concatenated.
  // return sortedArray.concat(leftArray).concat(rightArray);
  sortedArray = [...sortedArray, ...leftArray, ...rightArray];
  return sortedArray;
};

const inputArr = [3, 5, 2, 90, 4, 7];

console.log(mergeSort(inputArr));
