// 1.Finding the Middle Index
/*
A key step in each binary search iteration is to find the middle value of the current list context. In practice, we do this by tracking the first and last indices, then finding their average.

The first index we check will always be the middle value of the original list. Because of this, we start by setting the following first (left) and last (right) indices. Below, we show a pseudocode example of how to set these variables.

function binarySearch (arr, target)
  left = 0
  right = length of arr
  . . .
We could call a JavaScript implementation of this function with the following code:

const searchable = [1, 2, 7, 8, 22, 28, 41, 58, 67, 71, 94];
const target = 41;

console.log(binarySearch(searchable, target))

Because we pass in an array of length 11, the right variable is set to 11.

Next, we calculate the middle index of the array:

function binarySearch (arr, target)
  left = 0
  right = length of arr

  indexToCheck = the floor integer of (left + right) / 2

The above function will calculate the middle index of the array by calculating the average of right and left and rounding it to the floor integer. Given left is zero and right is 11:

floor(11+0)/2=5
So, the first index the function checks is 5.

Now you know how to calculate the first indexToCheck. In the next exercise, you will implement an approach to check whether the value at that index is equal to the target.
*/

const binarySearch0 = (arr, target) => {
  // Add left and right variables below
  let left = 0;
  let right = arr.length;
  // Add indexToCheck calculation below
  const indexToCheck = Math.floor((left + right) / 2);
  return indexToCheck;
};

// 2.Checking the Middle Index
/*
Let’s consider how to implement an approach to check whether the value at indexToCheck is equal to the target value. Below, we use pseudocode to display two additional steps that will check if the target value is found.

function binarySearch (arr, target)
  left = 0
  right = length of arr

  indexToCheck = the floor integer of (left + right) / 2
    
  checking = value of arr at indexToCheck

  if checking is the target
    return indexToCheck

In the example above, we set a variable called checking to the value in arr at the position indexToCheck. Then, we return the index if it is equal to the target value.
*/

const binarySearch1 = (arr, target) => {
  let left = 0;
  let right = arr.length;

  const indexToCheck = Math.floor((left + right) / 2);
  // 1. Create a constant called checking and set it equal to the value at indexToCheck
  const checking = arr[indexToCheck];
  // 2. Create an if statement that returns indexToCheck if checking is equal to target
  if (checking === target) {
    return indexToCheck;
  }
  return null;
};

// 3.Iterative Checking
/*
At this point, you have a function that checks the middle index of an input array and returns the index if the value equals target. Let’s consider how to extend the function to iteratively check sublists when the middle value is not equal to target.

Remember back to our algorithm, the function continues to execute until the left and right indices converge or the target is found. In practice, we can implement this with the following while condition.

while right is greater than left
 indexToCheck = the floor integer of (left + right) / 2 
 checking = value of arr at indexToCheck

 if checking is the target
   then return indexToCheck

Unfortunately, the above code will execute infinitely because our right and left variables do not converge from one iteration to the next. To address this issue, in addition to checking if the current value is the target value, we need to adjust the right or left index with each iteration.

while right is greater than left
  indexToCheck = the floor integer of (left + right) / 2 
  checking = value of arr at indexToCheck

  if checking is the target
    then return indexToCheck
  if target is greater than checking
    then set left to indexToCheck + 1
  else
    set right to indexToCheck

In the above code, we set the left or right index to a new value based on whether target is greater than or less than checking. The above while loop will continue to execute until the left index is greater than the right index.

In the code below, you will add conditions that change the left or right index based on whether checking is greater than or less than target. With each iteration, the distance from left to right will halve.
*/

export const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length;

  // Add a condition to the while loop so it continues to execute while right is greater than left.
  while (left < right) {
    const indexToCheck = Math.floor((left + right) / 2);
    const checking = arr[indexToCheck];
    console.log(`indexToCheck equals: ${indexToCheck}`);

    if (checking === target) {
      console.log(`The index of the target is: ${indexToCheck}. And the value of that index is: ${checking}. Great!`);
      return indexToCheck;
      // if target is greater than checking
    } else if (checking < target) {
      // set left to indexToCheck + 1
      left = indexToCheck + 1;
    } else {
      // set right to indexToCheck
      right = indexToCheck;
    }
  }
  return null;
};
