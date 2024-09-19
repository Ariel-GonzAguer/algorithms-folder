export class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  setNextNode(node) {
    if (!(node instanceof Node)) {
      throw new Error("Next node must be a member of the Node class");
    }
    this.next = node;
  }

  setNext(data) {
    this.next = data;
  }

  getNextNode() {
    return this.next;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const nextNode = new Node(data);
    const currentHead = this.head;
    this.head = nextNode;
    if (currentHead) {
      this.head.setNextNode(currentHead);
    }
  }

  addToTail(data) {
    let lastNode = this.head;
    if (!lastNode) {
      this.head = new Node(data);
    } else {
      let temp = this.head;
      while (temp.getNextNode() !== null) {
        temp = temp.getNextNode();
      }
      temp.setNextNode(new Node(data));
    }
  }

  removeHead() {
    const removedHead = this.head;
    if (!removedHead) {
      return;
    }
    if (removedHead.next) {
      this.head = removedHead.next;
    }
    return removedHead.data;
  }

  printList() {
    let currentNode = this.head;
    let output = "<head> ";
    while (currentNode !== null) {
      output += currentNode.data + " ";
      currentNode = currentNode.next;
    }
    output = output.concat("<tail>");
    console.log(output);
  }

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

  findNodeRecursively(data, currentNode = this.head) {
    if (currentNode === null) { // Base case: if we reach the end of the list and haven't found the data
      return null;
    } else if (currentNode.data === data) { // Base case: if we find the data
      return currentNode;
    } else { // Recursive case: if we haven't found the data yet, keep searching
      return this.findNodeRecursively(data, currentNode.next); // Recursive call with the next node
    }
  }
}
