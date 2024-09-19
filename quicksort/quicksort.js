import { swap } from './swap.js';
// Quick Sort
/*
1.Introduction
Quicksort is an efficient sorting algorithm that is based on the divide and conquer strategy. Like merge sort, the input array is partitioned into smaller parts and then combined after the elements have been rearranged. Unlike merge sort, which requires additional memory for auxiliary arrays, quicksort is space-saving because it deploys in-place sorting.

As runtime performance goes, quicksort requires more comparisons for sorting a larger input than mergesort. Like bubble sort, quicksort has a worst case runtime of O(N^2). This can happen when quicksort’s input data set comprises:

- pre-sorted numbers,
- backward-sorted numbers, or
- all similar elements along with a poorly chosen pivot element that produces a partition of zero or one element.
On average, like merge sort, the runtime of quicksort is O(N * log N) if partition sizes are roughly equal.

The basic idea of the quicksort algorithm is to:

1. split the initial unsorted data set into a left partition and a right partition
2. sort each partition recursively until there is only one element left
3. return the sorted array
We use a pivot element to divide our unsorted array into two parts. The elements in these parts must meet these conditions after partitioning:

- all elements in the left partition must be less than or equal to the pivot element
- all elements in the right partition must be greater than or equal to the pivot element
Determining the pivot index is done through a procedure called partitioning. Our algorithm uses an array to store the data set and stipulates the boundary of the data set with left and right pointers. The pseudocode for our quicksort algorithm is as follows:

If there is more than one element left in the array:
  Find the pivot index through partitioning

  If the left pointer is less than the pivot index:
    Call quicksort() on the portion of the array between the left pointer and the pivot. 

  If the pivot index is less than the right pointer:
    Call quicksort() on the portion of the array between the pivot index and the right pointer.

Return the sorted array
*/

// 2. Partitioning Part I - The Pivot Element
/*
Partitioning is the crux of the quicksort algorithm. Without it, we wouldn’t know how to split our unsorted array into useful partitions.

This procedure utilizes two internal indices, leftIndex and rightIndex that move in opposite directions. These indices are used for:

computing the pivot element
comparing the elements located at each index with the pivot element
determining the pivot index, the desired location of the pivot element in the set after elements have been swapped, if any
The basic idea of partitioning is as follows:

Start with the middle element
While you haven’t looked through the whole array (leftIndex is still < rightIndex)
move leftIndex up until you find something greater than the pivot
move rightIndex down until you find something less than the pivot
swap those elements, and move the indices in by one step so to continue checking if swaps are necessary
return the last left element index
An initial pivot element can be arbitrarily chosen in the beginning of the partitioning process to be one of the following by default:

first element of the array
last element of the array
middle element of the array
random element of the array
The final location of the pivot element will be determined at the end of the partitioning process.

In some quicksort implementations, the first or last element is commonly picked as the pivot element. In our JavaScript implementation, we will use the middle element instead because it provides a better average runtime. To do this, we will need both leftIndex and rightIndex.

pivot = the average of the sum of leftIndex and rightIndex rounded down
*/
const partition0 = (array, leftIndex, rightIndex) => {
  // Add three parameters: array, leftIndex, and rightIndex

  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
  return pivot;
};

// 3.Partitioning Part II - The Left and Right Indices
/*
The leftIndex and rightIndex of a set or subset are going to set the bounds of the partition. For the first iteration, both indices mark the entire span of the original data set. In the following illustrations, L and R represent leftIndex and rightIndex respectively.

[ 3, 1, 4, 2, 8, 9 ]
  L     P        R
The pivot element for this set will be 4 as it is located near the halfpoint of the data set and indicated by P.

Next, we want to compare the element at leftIndex with the pivot element, 4. As long as it is less than the pivot, meaning that it is in the correct half of the partition, we want to move the leftIndex forward one step to the right.

3 < 4, move L forward
[ 3, 1, 4, 2, 8, 9 ]
     L  P        R
1 < 4, move L forward
[ 3, 1, 4, 2, 8, 9 ]
        L        R
        P
4 = 4, stop
We stop leftIndex at position 2 because the element at index 2 (4) is not less than the pivot element 4. Next, we switch focus to the rightIndex and compare the element at rightIndex with the pivot element, 4. As long as it is greater than the pivot, we want to move the rightIndex backward one step to the left.

[ 3, 1, 4, 2, 8, 9 ]
        L        R
        P
9 > 4, move R backward
[ 3, 1, 4, 2, 8, 9 ]
        L     R
        P
8 > 4, move R backward
[ 3, 1, 4, 2, 8, 9 ]
        L  R
        P
2 < 4, stop
We stop the rightIndex at position 3 because the element at 3 (2) is not greater than the pivot element 4. This tells us that 2 does not belong in its current position because it should be on the left of the pivot element 4. In this case, we need to swap the elements at leftIndex and rightIndex.

We will handle swapping of index elements in the next exercise.
 */
const partition1 = (array, leftIndex, rightIndex) => {
  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];

  while(leftIndex <= rightIndex) { // write a while loop that will execute as long as leftIndex is less than or equal to rightIndex.

    while(array[leftIndex] < pivot) { // write another while loop that increments leftIndex as long as the element at leftIndex is less than pivot.
      leftIndex++;
    }
    while(array[rightIndex] > pivot) { // write another while loop that decrements rightIndex as long as the element at rightIndex is greater than pivot.
      rightIndex--;
    }
  }
}

// 4.Partitioning Part III - Swapping
/*
Recall that our leftIndex and rightIndex were at 2 and 3 respectively. They cannot move any further because their respective elements are greater than or less than the pivot element. When this happens, we need to swap those elements so that they will end up at the correct side of the partition.

[ 3, 1, 4, 2, 8, 9 ]
        L  R
        P
swap 4 and 2
[ 3, 1, 2, 4, 8, 9 ]
        L  R
        P
After we swap them, we move L forward and R backward.

Move L forward and R backward
[ 3, 1, 2, 4, 8, 9 ]
        R  L
        P
We return to our outer while loop condition to check if leftIndex (3) is less than or equal to rightIndex (2). In this case, 3 > 2, so we exit the while loop.

At this juncture, the elements that are less than the pivot are to the left of it and the elements that are greater than the pivot are to the right of it. We can stop partitioning and return the leftIndex which points to the pivot element 4. Hence, our pivot index is 3 which is also the leftIndex.
*/

const partition2 = (array, leftIndex, rightIndex) => {
  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
  while (leftIndex <= rightIndex) {
    while (array[leftIndex] < pivot) {
      leftIndex++;
    }
    while (array[rightIndex] > pivot) {
      rightIndex--;
    }
    // Inside the outer while loop...
    if (leftIndex <= rightIndex) { // check if leftIndex is still less than or equal to rightIndex.

      swap(array, leftIndex, rightIndex); // swap the elements at both indices using the swap(arrayToSwap, indexOne, indexTwo) helper function.

      leftIndex++; // increment leftIndex

      rightIndex--; // decrement rightIndex
    }
  }
  // Outside the outer while loop...
return leftIndex; //return leftIndex
}

// 5.Recursive Quicksort
/*
Now that we have finished implementing partition(), let’s implement the quicksort() function, which is recursive. This function takes in three parameters:

Input array
Left pointer
Right pointer
The base case for this function is when the array has one element, meaning that it is sorted. As a result, the array is returned. Our JavaScript implementation does in-place sorting, hence, the array size does not change. A one-element array is symbolized by both left and right pointers pointing to the same element.

Our quicksort() function will start by calling the partition() function with the input array bounded by the left and right pointers as long as the left pointer is less than the right pointer.

The recursive steps are executed after partitioning:

Call quicksort() to process only the left partition bounded by the left pointer and (pivot index - 1) to exclude the pivot element from the left partition
Call quicksort() to process only the right partition bounded by the pivot index and right pointer
Continuing from the example in the last exercise, recall that we returned a pivot index, P, that points to pivot element 4 at index 3 as pointed to by L.

[ 3, 1, 2, 4, 8, 9 ]
        R  L
           P
Recall that the initial left pointer, which we will call leftBound is 0 and the initial right pointer, rightBound, is 5.

Recursively call quicksort() with the array [ 3, 1, 2, 4, 8, 9 ], left pointer 0 and right pointer 2 for the left partition [ 3, 1, 2 ] which excludes the pivot index, 3.

Similarly, we will recursively call quicksort() with the array [ 3, 1, 2, 4, 8, 9 ], left pointer 3 and right pointer 5 for the right partition [ 4, 8, 9 ] which includes the pivot index, 3.
*/

// add quicksort arrow function
export const quicksort = (array, leftBound = 0, rightBound = array.length - 1) => {

  // Inside quicksort(), write an if statement where the input array has more than one element. 
  // to tell if the array has more than one element, check if rightBound is greater than leftBound.
  if (rightBound > leftBound) {
    const pivotIndex = partition(array, leftBound, rightBound) // create a const variable, pivotIndex and assign it to the return value of calling partition() with the input array, leftBound and rightBound.

    // Once we have determined the location of the pivot element, we can now call quicksort() to recursively sort the left array partition excluding the pivot element. Inside your if statement, below the declaration of pivotIndex, call quicksort() with the input array, leftBound and pivotIndex - 1 as parameters.
    quicksort(array, leftBound, pivotIndex - 1);

    // We will also call quicksort() to recursively sort the elements in the right array partition inclusive of the pivot element. Inside the same if statement, call quicksort() with the input array, pivotIndex and rightBound as parameters.
    quicksort(array, pivotIndex, rightBound);
  }
  return array; // return the input array.
}

 const partition = (array, leftIndex, rightIndex) => {
  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
  while (leftIndex <= rightIndex) {
    while (array[leftIndex] < pivot) {
      leftIndex++;
    }
    while (array[rightIndex] > pivot) {
      rightIndex--;
    }
    if (leftIndex <= rightIndex) {
      swap(array, leftIndex, rightIndex);
      leftIndex++;
      rightIndex--;
    }
  }
  return leftIndex;
}

// 6.Logging
/*
Let’s put our implementation of the quicksort algorithm into practice. In order to understand what is going on internally inside each call to quicksort() and partition(), we have inserted log statements at various steps to illustrate the following events:

a recursive call is about to occur
partitioning is taking place
leftIndex and rightIndex are incremented
swapping has taken place

See test.js
*/
