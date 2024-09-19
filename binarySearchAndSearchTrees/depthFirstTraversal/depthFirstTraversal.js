import { simpleGraph } from "./simpleGraph.js";

// 1.Depth-First Traversal (One path)
/*
Traversals are incredibly useful when you are trying to find a particular value or a particular path in a graph. We’ll first explore the depth-first traversal function for traversing through a directed graph. To recap, depth-first traversals iterate down each vertex, one neighbor at a time, before going back up and looking at the neighbor’s connected vertices. In this exercise, we will focus on traversing down the full length of one path and logging each vertex’s data value.

For simplicity, we’ll implement the traversal iterator as a separate function instead of as a method on the Graph class. In other implementations, the iterator can be seen as a class method.
*/

// Since it will be used to traverse a graph, we can expect for the graph to be provided in the form of the starting vertex.
// Add a vertex parameter, start, and print out the parameter’s data property so we can see which vertex we are on.
const depthFirstTraversal0 = (start, visitedVertices = [start]) => {
  console.log(start.data);

  // Verificar si hay aristas. agrega una declaración if para verificar si start.edges tiene una longitud mayor que 0.
  if (start.edges.length > 0) {
    //Obtener el primer vecino. Each edge has an end property which contains the neighboring vertex. The first neighbor would be in the first edge of the edges array.
    const neighbor = start.edges[0].end;

    //Now that we have the first neighbor, we want to go down this neighbor’s first edge, and then traverse down that vertex’s first edge, and so on. To do that, we can leverage recursion to take care of the downward traversal by passing the neighbor vertex as the new starting vertex in the function call.
    // Call the depthFirstTraversal() function if the start vertex has neighbors left to traverse. Make sure to pass in the neighbor vertex to the recursive call so that we can go down the path and iterate through the neighbor’s first connected vertex.
    // Since we’re making a recursive call through the neighbors, we can remove the call to console.log that prints out the neighbor.data.
    depthFirstTraversal0(neighbor);

    // If there was a cycle, or if the neighbor’s first connected vertex is the neighbor, we would be stuck in an infinite loop, iterating between the same neighbors. To account for this, we can add an array to keep track of all the vertices that we have visited. We should pass it in every recursive call, to make sure we never visit the same vertex more than once.
    // Add a second parameter to the function called visitedVertices. By default, it should be set to an array that contains the start argument.
    // Then, add an if statement to check if it does not include the neighbor vertex. We shouldn’t visit a vertex more than once, so make the recursive call if the neighbor is not included in the visitedVertices.
    if (!visitedVertices.includes(neighbor)) {
      visitedVertices.push(neighbor);

      //Whenever we make another call to traverse down the paths, we are visiting a new vertex so we should update the list of visitedVertices to reflect that.
      //Right before we make the recursive call to the depthFirstTraversal() function, add the neighbor vertex to the array of visitedVertices.
      //The visitedVertices is now changed, so our recursive call should be aware of that. Pass the updated visitedVertices as the second argument to the call to depthFirstTraversal().
      depthFirstTraversal0(neighbor, visitedVertices);
    }
  }
};

// 2.Depth-First Traversal (All paths)
/*
We’ve gotten the hang of traversing down one path, but we want to traverse down all the paths (not just the first possible path). We will modify our existing implementation to iterate down all the other paths by using a .forEach() loop to iterate through all of the start vertex’s edges.

We won’t have to worry about iterating through all the neighbors before going down the neighbor’s first connected vertex. This is because the recursive call occurs before the next iteration of the for loop.
*/

const depthFirstTraversal1 = (start, visitedVertices = [start]) => {
  console.log(start.data);

  // To traverse down all paths, we no longer need the if statement to check if there are edges to traverse. Instead, we will use an iterator to go through all of the vertex’s edges. If there are no edges, then the edges array would be empty and nothing would happen.
  // Replace the if statement with a .forEach() iterator — but do not replace the entire if block! This .forEach() should iterate through the start vertex’s list of edges. Pass the iterator an anonymous function with one parameter, edge.
  start.edges.forEach((edge) => {
    // Inside the anonymous function, re-assign neighbor to the edge parameter’s end vertex.
    const neighbor = edge.end;
    if (!visitedVertices.includes(neighbor)) {
      visitedVertices.push(neighbor);
      depthFirstTraversal1(neighbor, visitedVertices);
    }
  });
};

// 3.Depth-First Traversal (Callbacks)
/*
Our current implementation of the depth-first traversal simply prints out the vertices of the graph as they are traversed. This would be useful in scenarios where we want to see the order that the traversal occurs in. For example, if the graph was an instruction list, we need the exact order that the steps will occur to determine which dependencies need to be resolved first.

However, there may be other instances where we want to do something other than printing out the traversal order. For example, if we just need to determine if a path exists, like seeing if a maze is solvable, we just need a true or false value. We can do this by opening up a callback parameter for the user.
*/

// Since we want to open up another parameter as a callback, add another parameter to depthFirstTraversal() called callback as the second parameter.
// We want to avoid making the callback the third parameter to simplify depthFirstTraversal() for the user. This means they won’t be forced to supply the visitedVertices parameter if they also want to override the default callback argument.

const depthFirstTraversal = (start, callback, visitedVertices = [start]) => {
  callback(start);

  start.edges.forEach((edge) => {
    const neighbor = edge.end;

    if (!visitedVertices.includes(neighbor)) {
      visitedVertices.push(neighbor);

      // In the recursive call to depthFirstTraversal(), add the callback argument.
      depthFirstTraversal(neighbor, callback, visitedVertices);
    }
  });
};

//add a function as a second argument to depthFirstTraversal() at the bottom of depthFirstTraversal.js. This function should accept a vertex as an argument and print out the data property. Since we passed in a print function as our callback, we should still see the order that the vertices are traversed in.
depthFirstTraversal(testGraph.vertices[0], (vertex) =>
  console.log(vertex.data)
);

// 4. Breadth-First Traversal (First layer)
/*
Now it’s time to focus on breadth-first traversal! Just as a reminder, breadth-first iterates through the whole graph in layers by going down one layer, which comprises the start vertex’s direct neighbors. Then it proceeds down to the next layer which consists of all the vertices that are neighbors of the vertices in the previous layer.

For this exercise, let’s focus on traversing down one layer. We will take a similar approach as we did with the depth-first traversal by keeping an array of visitedVertices to prevent us from iterating through the same vertices.

However, we will iterate through all of the direct neighbor vertices instead of iterating down the neighbor’s first edge. We will also use a queue to traverse through the graph instead of recursion to explore the different ways we can implement the traversals.
*/

// Add the start vertex as a parameter
const breadthFirstTraversal = (start) => {
  // Now we should set up our list of visitedVertices so we can mark the neighbor vertex as “visited”. We won’t need to provide the visitedVertices as an argument since we are using a queue to traverse through the graph instead of recursion.
  //Inside the function and before the forEach loop, create a const variable, visitedVertices. Set it to an array with the start vertex as the first element.
  const visitedVertices = [start];

  //Next, we will go down one layer and traverse all of the start vertex’s neighbor. Set up a .forEach() iterator to iterate through all of its edges.
  start.edges.forEach((edge) => {
    // Each edge contains the neighboring vertex in its end property, which will be our neighbor. Create a const variable, neighbor, and set it to the end property of each edge.
    const neighbor = edge.end;

    // efore we can mark the neighbor as “visited”, we need to check that the visitedVertices does not already include the neighbor vertex. Otherwise, we could end up “visiting” the vertices multiple times by adding duplicates of the vertex in our visitedVertices list.
    //After the neighbor vertex is declared, add an if statement that checks that the neighbor is not included in the visitedVertices. If the neighbor is not, then we can mark it as “visited” by adding it to the list of visitedVertices.
    if (!visitedVertices.includes(neighbor)) {
      visitedVertices.push(neighbor);
    }

    // We’ve now successfully iterated through all of the start vertex’s neighbors. To check that we are “visiting” the vertices in the correct order, print out the visitedVertices right before the end of the function.
    console.log(visitedVertices);
  });
};

// 5.Breadth-First Traversal (All layers)
/*
So far, we can iterate down one layer, but we have yet to iterate down the remaining layers. In order to do so, we will introduce a queue that will keep track of all of the vertices to visit.

As we iterate through the neighbors, we will add its connected vertices to the end of the queue, pull off the next neighbor from the queue, add its connected vertices, and so on. This way allows us to maintain the visiting order; we will visit the vertices across the same layer while queueing up the next layer. When there are no vertices left in the current layer, the vertices of the next layer are already queued up, so we move down and iterate across the next layer.

We will use our implementation of the Queue data structure.
*/

import { Queue } from "./queue.js";

const breadthFirstTraversal2 = (start) => {
  const visitedVertices = [start];

  // We will create our queue with the start vertex as the first connected vertex to iterate through.
  // Right after we create our list of visitedVertices, create a const variable, visitQueue. Instantiate a new Queue and assign it to the visitQueue.
  const visitQueue = new Queue();

  //Then .enqueue() the start vertex to the queue.
  visitQueue.enqueue(start);

  // The queue holds all of the vertices that we have yet to iterate through. This means we want to continue iterating through these vertices as long as there are vertices left in the queue.
  // After we enqueue the start vertex, add in a while loop that continues to run as long as the visitQueue is not empty. Make sure that it includes dequeuing the next vertex and the forEach() iterator, since we also want to update visitedVertices if there are still vertices in the queue.
  while (!visitQueue.isEmpty()) {

    //When we are looking at a vertex from visitQueue, we want to dequeue it so that we don’t look at it again. The visitedVertices array ensures that it does not get enqueued into visitQueue again.
    //Before the .forEach() iterator, .dequeue() the next vertex from the visitQueue and assign it to the current variable with const. Go ahead and print out the data property of the current vertex so we can see which vertex we’re looking at.
    const current = visitQueue.dequeue();
    console.log(current.data);

    // Next, we want to iterate through the current vertex’s neighbors and enqueue them, not just the start vertex’s neighbors.
    //Update the .forEach() iterator to iterate through the current vertex’s edges instead. Then, inside the .forEach() iterator, if the visitedVertices does not include the neighbor, we should enqueue the neighbor to the visitQueue.

    current.edges.forEach((edge) => {
      const neighbor = edge.end;

      if (!visitedVertices.includes(neighbor)) {
        visitedVertices.push(neighbor);
        visitQueue.enqueue(neighbor);
      }
    })
  }
};