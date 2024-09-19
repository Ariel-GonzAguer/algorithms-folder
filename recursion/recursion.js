// 1.Introduction
/*
Recursion is a powerful tool for solving problems that require the execution of a similar action multiple times until a certain condition is met. For many problems, a recursive solution will result in fewer lines of code and will be easier to comprehend than a solution that uses a for or while loop.

You may find that recursion is a difficult concept to wrap your head around at first. That’s fine! This lesson is meant as an introduction. As you see more examples, you will start to feel comfortable with the concept.

In this lesson, you will learn about recursion while implementing a function that returns the factorial of a number. Factorial is the product of an integer and all positive numbers less than it.

Let’s consider 4 factorial:

4! = 4 × 3 × 2 × 1 = 24 

Four factorial is equal to the product of 4 x 3 x 2 x 1, which is 24. The exclamation mark denotes that the number 4 is being factorialized.

1! and 0! are both valid base cases of factorial. The factorial product of both numbers is 1.

Before we dive into recursion, you will consider how factorial is implemented with an iterative approach.
*/

// iterative method
const iterativeFactorial = (n) => {
  let result = 1;
  while(n > 0) {
    result *= n;
    n -= 1;
  }
  return result;
}

// 2.Recursion
/*
So, what is recursion?

Recursion is a computational approach where a function calls itself from within its body. Programmers use recursion when they need to perform a similar action multiple times in a row until it reaches a predefined stopping point, also known as a base case.

Let’s think about this in the context of our factorial example. Below is the beginning of a recursive implementation of factorial.
>
const recursiveFactorial = (n) => {
  if (condition){
    console.log(`Execution context: ${n}`);

    recursiveFactorial(n - 1);
  }
};
<

Within the recursiveFactorial() function, we want to check whether a condition is met. If it is, then we print the value of n and return a call to recursiveFactorial(n - 1).

Can you think of a condition that will result in the following response when we call recursiveFactorial(4)?
>
Execution context: 4
Execution context: 3
Execution context: 2
Execution context: 1
<

The correct answer is n > 0. At this point, we have the beginnings of a recursive function, but we’re still not returning anything.
*/

const recursiveFactorial1 = (n) => {
  if (n > 0) {
    console.log(`Execution context: ${n}`);
    
    recursiveFactorial1(n - 1);
  }
}

const recursiveSolution1 = recursiveFactorial1(4);
console.log(recursiveSolution); 
/*Output:
Execution context: 4
Execution context: 3
Execution context: 2
Execution context: 1
undefined
*/ 

// 3.Recursive Case
/*
You created a condition (n > 0 or n >= 1). This condition is important, because it defines whether or not recursiveFactorial() calls itself. We call this if block the recursive case.

In recursion, the recursive case is the condition under which a function calls itself. We call this the recursive case because, as mentioned last exercise, recursion is defined as a process when a function calls itself.

At this point, there are a couple of shortcomings in the implementation that are worth mentioning:

1.Calculating the product of the numbers – while we do access all of the numbers that need to be multiplied, we do not calculate their product.
2.recursiveSolution is set to undefined – the value set to recursiveSolution (see index.js to the right) is undefined, because we never returned anything from recursiveFactorial().
*/

const recursiveFactorial = (n) => {
  if (n > 0){
    console.log(`Execution context: ${n}`);
    
    return recursiveFactorial(n - 1) * n; // recursive case
  }
}

const recursiveSolution = recursiveFactorial(0);
console.log(recursiveSolution);
/*Output:
Execution context: 4
Execution context: 3
Execution context: 2
Execution context: 1
NaN
*/

// 4.Base Case
/*
The solution to the last exercise resulted in the following output:
>
Execution context: 4
Execution context: 3
Execution context: 2
Execution context: 1
NaN
<
Notice, the value saved to recursiveSolution changed from undefined to NaN (not a number).

Why is recursiveSolution not a number? The short answer: we didn’t define a base case. To understand the need for a base case, it’s worth discussing the call stack that JavaScript creates when you call recursiveFactorial().

If you were to call:
recursiveSolution = recursiveFactorial(3)

JavaScript would create a call stack with the following events:
1.recursiveFactorial(3) = 3 * recursiveFactorial(2)
2.recursiveFactorial(2) = 2 * recursiveFactorial(1)
3.recursiveFactorial(1) = 1 * recursiveFactorial(0)

The return value associated with each function call depends on the value returned by the n - 1 context. Because the current implementation does not return a number for recursiveFactorial(0), the result of (3) is NaN. This leads to an NaN solution for each of the contexts above it.

We need a base case to address the NaN returned from the n === 0 context. The factorial function should return a number when n === 0.
*/

const recursiveFactorial99 = (n) => {
  // Add a base case
  if(n === 0) { //  add an if
    return 1; // returns 1 when n is equal to 0.
  }
  
  if (n > 0){
    console.log(`Execution context: ${n}`);
    
    return recursiveFactorial99(n - 1) * n;
  }
}

const recursiveSolution99 = recursiveFactorial99(5);
console.log(recursiveSolution99);