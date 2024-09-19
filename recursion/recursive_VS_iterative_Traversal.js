import { LinkedList, Node } from './LinkedListClass_AND_NodeClass.js';

// 1.Introduction
/*
In this lesson, you will learn how to implement a recursive solution to a linked list search. The method accepts a value as input and recursively checks each node in the linked list, until the node of interest is found. If it is found, the method should return the node. Otherwise, it should return null.

Before you begin, let’s take a look at how we can search for an element in a linked list using an iterative approach. The code below is taken from the LinkedList() class.
>
findNodeIteratively(data) {
  let currentNode = this.head;
  while (currentNode !== null) {
    if (currentNode.data === data) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }
  return null;
}

The method starts at the head of the linked list and checks if the input data is equal to the data parameter at the head. The method continues to iterate through the linked list until the node is found or the end of the list is reached.
<
*/

// 2.Base Case
/*
Before we consider the base and recursive cases, let’s think about the two parameters required to traverse a linked list recursively:

data – the first parameter. This is the value of the Node that is being searched for in the linked list.
currentNode – the second parameter. This is the current node in the linked list. During each recursive call, the function will pass the next node as this argument.
>
class LinkedList {

  findNodeRecursively(data, currentNode = this.head) {
   // Some code  
  }
}
<

Notice, we added this.head as the default argument for currentNode. This is useful because, if you call findNodeRecursively() with only a data argument, the method will traverse the entire linked list beginning from its head.

Now let’s consider the base case for our linked list. We should return a value under the following two cases:

1.If the method finds a node with the matching value, it should return the node.
2.If the method reaches the end of the list, it should return null.

See LinkedListClass_AND_NodeClass.js for the implementation.
*/

// 3.Recursive Case
/*
Now it’s time to add a recursive case. The recursive case should execute when the node has not been found and the end of the list has not been reached.

Because you’ve covered both of the base cases, you can use an else statement to call your recursive case.

See LinkedListClass_AND_NodeClass.js for the implementation.
*/