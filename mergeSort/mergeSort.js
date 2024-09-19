// Merge Sort
// 1.Introduction
/*
The algorithm consists of two distinct steps:

1.Splitting the input array – The algorithm recursively splits the input array until each element is in its own array. This portion of the algorithm is represented in the top half of the image to the right -> see sortMergeIMG file.
2.Merging sorted arrays – The algorithm compares and combines the elements of arrays until the input array is sorted. This is shown in the bottom half of the image -> see sortMergeIMG file.
*/

// 2.Splitting: Base Case
/*
In this implementation of merge sort, you will build a recursive function, called mergeSort(), that splits the input array until each element is in its own array.

So, if the input array is: [3, 5, 2]
splitting these elements into their own arrays will look like:
[3]
[5]
[2]

The base case of this recursive function is when the input array has only one element in it. Below is a pseudocode implementation of the base case:
>
function mergeSort(arr)
  if the length of arr equals 1
    return arr
<
*/

const mergeSort1 = (startArray) => {
  let length = startArray.length; // add a line that saves the length of startArray

  if (length === 1) { // if length is equal to 1
    return startArray; // return startArray
  }
};

const inputArr = [3];

// 3.Splitting: Recursive Case
/*
The recursive case of our mergeSort() function requires that we first split the input array into a leftArray and rightArray:
>
function mergeSort(arr)
  if the length of arr equals 1
    return arr

  midIndex = the floor integer of (left + right) / 2
  leftArr = arr from 0 to midIndex
  rightArr = arr from midIndex to end
<
In the example above, the leftArray is equal to the input arr from 0 to the middle index. The right array is from the middle index to the end.

Next, we pass the left and right arrays into the mergeSort() function:
>
function mergeSort(arr)
  if the length of arr equals 1
    return arr

  midIndex = the floor integer of (left + right) / 2
  leftArray = arr from 0 to midIndex
  rightArray = arr from midIndex to end

  mergeSort(leftArray)
  mergeSort(rightArray)
<
This is our recursive call.
*/

const mergeSort2 = (startArray) => {
  const length = startArray.length;
  if (length === 1) {
    console.log(startArray);
    return startArray;
  }
  const mid = Math.floor(length / 2); // Create a constant variable called mid and set it equal to the floor of length / 2
  
  const leftArray = startArray.slice(0, mid); // Create a leftArray variable and set it equal to a new array of elements from startArray, from 0 to mid.

  const rightArray  = startArray.slice(mid, length); // Create a variable called rightArray and set it equal to the elements of startArray from mid to length.


  mergeSort2(leftArray);
  mergeSort2(rightArray);
} 


// 4.Call merge() from mergeSort()
/*
  At this point, we have a function that recursively splits the input array until each element is in a single-element array. The final step is to call the function that is responsible for merging the leftArray and rightArray.
>
function mergeSort(arr)
  if the length of arr equals 1
    return arr

  midIndex = the floor integer of (left + right) / 2
  leftArray = arr from 0 to midIndex
  rightArray = arr from midIndex to end

  return merge(mergeSort(leftArray), mergeSort(rightArray))
<
In the last line of the pseudocode, we call a function named merge(). In the next exercise, you will implement a merge() function that combines the sorted leftArray and rightArray halves into a larger sorted array.
*/

// 5.Merging
/*
Now, let’s turn our attention to the merge() function. First, let’s think about its arguments and what it returns:

- Arguments: two sorted lists as inputs (leftArray and rightArray)
- Returns: a sorted list with the elements of leftArray and rightArray combined. We will call this new array sortedArray

Let’s break the implementation of this function into three parts:

1. Create a while loop that continues while there are still elements in leftArray and rightArray.
>
function merge(leftArray, rightArray)
  sortedArray = []
  while leftArray and rightArray have a length greater than 0
    // Do something
  
  return sortedArray
<

2. Create conditions that adds an element to sortedArray with each loop.
>
function merge(leftArr, rightArr)
  sortedArray = []
  while leftArray and rightArray have a length greater than 0
    if leftArray[0] is less than rightArray[0]
      push leftArray[0] onto sortedArray
      remove leftArray[0] from leftArray
    else 
      push rightArray[0] onto sortedArray
      remove rightArray[0] from rightArray
<
This code will add the smaller number, between leftArray[0] and rightArray[0] to the new array. Then, it will remove that number from the array.

3. Return sortedArray, with leftArray and rightArray concatenated.
>
function merge(leftArr, rightArr)
  sortedArray = []
  while leftArray and rightArray have a length greater than 0
    if leftArray[0] is less than rightArray[0]
      push leftArray[0] onto sortedArray
      remove leftArray[0] from leftArray
    else 
      push rightArray[0] onto sortedArray
      remove rightArray[0] from rightArray


  return sortedArray with leftArray and rightArray concatenated
<

Because the while loop continues until either leftArray or rightArray is empty, you need to concatenate whatever is left in the other array to the sorted array. In JavaScript, it’s easiest to implement this by concatenating both arrays, because the empty array will not alter the original.
*/

const mergeSort = (startArray) => {
  const length = startArray.length;
  if (length === 1) {
    return startArray;
  }

  const mid = Math.floor(length / 2);
  const leftArray = startArray.slice(0, mid);
  const rightArray = startArray.slice(mid, length);

  return merge(mergeSort(leftArray), mergeSort(rightArray))
}

const merge = (leftArray, rightArray) => {
  const sortedArray = [];

  while (leftArray.length > 0 && rightArray.length > 0) { // loop until leftArray and rightArray are empty

    if (leftArray[0] < rightArray[0]) { // checks if leftArray[0] is less than rightArray[0]

      sortedArray.push(leftArray[0]); // append that number to sortedArray

      leftArray.shift(); // remove it from leftArray
    } else {
      sortedArray.push(rightArray[0]); // appends rightArray[0] to sortedArray

      rightArray.shift(); // removes that number from rightArray
    }

    // can also use this variant:
    /*
      leftArray[0] < rightArray[0] ? sortedArray.push(leftArray.shift()) : sortedArray.push(rightArray.shift());
    */
  }
    // Once the while loop has completed, return the sortedArray with leftArray and rightArray concatenated.
  return sortedArray.concat(leftArray).concat(rightArray);
  // or, make sortedArray a let variable, then:
  // sortedArray = [...sortedArray, ...leftArray, ...rightArray];
  // return sortedArray;
}

// 
// An important point to remember about merge sort is that the algorithm is broken into two parts: splitting and merging.