// 3.Swap
const swap = (arr, indexOne, indexTwo) => {
  // Create a constant called temp and store the value of the element at the indexTwo position in the input array so it can be referenced later.
  const temp = arr[indexTwo];

  // Change the element at indexTwo of the input array to the value of the element at indexOne.
  arr[indexTwo] = arr[indexOne];

  // Change the element at indexOne of the input array to the original value of the element at indexTwo.
  arr[indexOne] = temp;
};

