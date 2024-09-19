// 1.Intro to Bubble Sort
/*
Preparing for interviews will require you to become comfortable with implementing and discussing various algorithms. In particular, sorting algorithms, or algorithms that order elements in an array in a particular way, can be a popular topic. One example of a sorting algorithm is bubble sort.

The bubble sort algorithm takes an array of elements and reorders the elements of the input from smallest to largest. To achieve this, bubble sort works by comparing a pair of neighboring elements and swapping their positions in the array so that the larger of the two elements is always on the right. Doing this continuously results in the largest element “bubbling” up to the end of the array, giving this sort its name. The algorithm only stops when there are no more values that need to be swapped.

Below is a quick pseudocode example of what we will create in this lesson:
>
while array is not sorted
  for each value in array
    if current value > next value
      swap current value and next value
      return array 
<

Bubble sort is not the most efficient sorting algorithm. Bubble sort’s worst-case runtime is O(n^2). This is because we have to compare the current element we are looking at, to each element in the array after it and repeat this check for every single element in the array. Its best-case runtime is O(n) for an already-sorted list.
*/

// 2.Loops
/*
In order to sort an array, we’ll need to visit pairs of elements and check if they should be moved or kept at their current index. To accomplish this we’ll use two loops:

One loop that will execute an inner loop depending on the state of a variable representing whether the input array might be sorted or not
An inner loop to compare and swap pairs of elements in the array
*/

const bubbleSort0 = (input) => {
  // To start sorting, we will use a variable to store the condition of the input array as a Boolean value: true, meaning our input array might still be unsorted and need additional swaps of elements and we’ll later change it to false, meaning the input array does not need anymore swapping to sort it.
  let swapping = true;

  // This is the outer loop of our program that only runs if the input array might not be sorted and needs swapping, (the condition stored in swapping).
  while (swapping) {
    // To stop our while loop we only need to change the while condition to false. Inside of the while loop we created, set swapping to false. (We’ll add code later that will restart the loop if we might have to keep swapping to “bubble up” elements to the end of the array.)
    swapping = false;

    // Create a for loop nested inside the while loop under the line where you reassigned the value of swapping. The for loop should visit every element in the input array starting from the first element and stopping at the second-to-last element. Setting the condition for the loop this way allows us to stay within the bounds of our input array and only check elements that exist.
    for (let i = 0; i < input.length - 1; i++) {}
  }

  // Lastly, bubbleSort() should return a sorted input array, (we’ll do the actual sorting in a later exercise), return the sorted input array if we’ve exited our while loop.
  return input;
};

// 3.Swap
/* 
An essential part of bubble sort is the “swapping” of pairs of unsorted elements.
To swap pairs of elements, we’ll need to store one of the values at either index in a temporary variable so we can use it later. For example, doing something like this:
>
currentValue = nextValue;
nextValue = currentValue;
<

would not work because we’d “lose” one of the values. The original value of currentValue would be overwritten and there would be no reference to it. Using the temporary variable strategy seen in the GIF above avoids the loss of any of the values whose position we need to exchange.

We’ll employ this strategy to finish building out swap().
*/

// 4.Compare
/*
We have a loop to run our algorithm, and another that visits each element in the input array but if we were to run this as is, it would only iterate through the array once.

Let’s add some additional logic to bubbleSort.js that will compare neighboring elements and swap them if necessary. For this, you’ll only be adding code inside of the for loop of bubbleSort().
*/

const bubbleSort1 = (input) => {
  let swapping = true;

  while (swapping) {
    swapping = false;
    for (let i = 0; i < input.length - 1; i++) {
      // create a conditional that checks if the element at the current index is greater than the element one index after it.
      if (input[i] > input[i + 1]) {

        // To see how we’re changing our input array by swapping elements, add the following inside of the if statement you created. This code will log a message for every swap made when we execute bubbleSort().
        console.log(`Swapping pair ${input[i]}, ${input[i + 1]} in [${input}]`);

        // add a call to swap() with the respective parameters
        swap(input, i, i + 1);

        // If we make a swap, we want to loop through the array again to see if we need to make additional swaps to continue “bubbling up” elements in the wrong position. Keep our while loop running by changing the value of the while condition variable so that it evaluates as true.
        swapping = true;
      }
    }
  }
  return input;
};
