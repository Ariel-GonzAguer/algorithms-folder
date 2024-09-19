// Dijkstra's Algorithm

// 1.Setup
/*
Dijkstra’s Algorithm is used for evaluating the shortest paths between vertices in a graph. The general strategy is to iterate through the vertices in such a way that will always allow us to only consider the shorter path at each vertex and maintain every possible shortest path as we go.

We will first implement the algorithm to find the shortest distance to every vertex. Our implementation will take the following steps:

    1.Evaluate the distances between the starting vertex and its neighbors
    2.If the new distance to the neighbor is lower than the previous distance, record it, and queue up the neighbor
    3.Dequeue the next vertex to evaluate
    4.Repeat steps 2 - 3 until there are no more vertices left in the queue.

In this exercise, we will set up the objects that will keep track of the shortest distances between the starting vertex and each other vertex, and the shortest paths.

We will be using a priority queue, which is a specialized heap data structure, to maintain the vertices we need to evaluate next. We’ll explain in a later exercise exactly what it is and the reason for using it instead of a regular queue.
*/

import { testGraph } from "./testGraph.js";

//1.1 To begin, we need to provision our dijkstras() function with two parameters: graph and startingVertex. graph is the actual data structure instance. startingVertex indicates the starting point from which we will construct the paths.
//1.2 In the dijkstras() function, specify the graph as the first parameter and startingVertex as the second parameter.
const dijkstras0 = (graph, startingVertex) => {
  //2.1 We will want to keep track of the total distances for the shortest paths to each vertex. In the dijkstras() function, create a distances constant and set it to an empty object. distances will be used to map each vertex to the distance of its path to the starting vertex.
  const distances = {};

  //3.1 The last thing we want to track is the shortest paths to each vertex. Instead of recording the full path to every vertex, we just need the previous vertex. This is because we are guaranteed that the vertices leading up to the previous vertex are also the shortest distance, and we can reconstruct the full path by tracing through each vertex’s previous vertex.
  //3.2 After distances is created, create a constant called previous, and set it equal to an empty object. This will be a map of every vertex to its corresponding previous vertex.
  const previous = {};

  //2.2 Before we can start evaluating the paths, we also need to initialize each vertex’s distance to Infinity. Any connection will be shorter than Infinity, no matter how large the weight is. As long as there is a connection between two vertices, the connection will always be recognized as part of the shortest path over Infinity.
  //2.3 Iterate through the graph’s vertices using .forEach(). In the distances object, assign each vertex’s data to Infinity. We want the key to be the vertex’s data property and not the vertex itself to make it easier to read and access.
  graph.vertices.forEach((vertex) => {
    distances[vertex.data] = Infinity;

    //3.3 We will also need to initialize the vertices in the previous object. In the iterator and after the distances are initialized, map each vertex’s data in the previous object to null. This accounts for situations where the graph is disconnected, or there are vertices that do not have edges leading to them.
    previous[vertex.data] = null;
  });
  // console.log(distances); // 2.4 Use a console.log() after your .forEach() if you want to examine the distances object.

  //4.1 After we finish iterating through the graph’s vertices, set the distance of the startingVertex.data in distances to 0.
  distances[startingVertex.data] = 0;

  //5.1 Now we want to return the results of our evaluations in distances and previous. This allows for the user who makes a call to our function to use these computed values.
  //5.2 You can return both values by returning an object with distances and previous keys set to their respective variables.
  return { distances, previous };
};

// 2.const testGraph = require('./testGraph.js');
/*
We have all of our records set up, so we can start traversing through the graph and evaluating the distances from the starting vertex to its neighbors.

In the evaluation of each neighbor, we compare the distance of the new path to the distance of the previous path. If the distance of the new path is shorter, we will update our records of distances and previous vertices with the new path.

Every time we evaluate an edge between a vertex and its neighbor, the if condition ensures that the record will always maintain the shortest path among the evaluations so far. This is why we can use the previously recorded distance for comparison in our evaluation.
*/

const dijkstras1 = (graph, startingVertex) => {
  const distances = {};
  const previous = {};

  graph.vertices.forEach((vertex) => {
    distances[vertex.data] = Infinity;
    previous[vertex.data] = null;
  });

  distances[startingVertex.data] = 0;

  // 1.1 Right before we return the recorded results, create a const variable, vertex, and set it to startingVertex.
  const vertex = startingVertex;

  //1.2 Then use a .forEach() iterator to go through the vertex’s list of edges. We will use the edge argument for this iterator.
  vertex.edges.forEach((edge) => {
    // 2.1 On each iteration through the edges, we are evaluating an alternate path to a different neighbor. The distance of the new path is the sum of the distance from the vertex to the neighbor and the distance from the starting vertex to the vertex.
    // 2.2 Inside the .forEach() iterator, create a const variable, alternate, and set it to the sum of the edge’s weight and the value of the vertex’s distance in distances.
    const alternate = edge.weight + distances[vertex.data];

    //3.1 Now we can compare the distance of the new alternate path to the distance of the last recorded path to the neighbor. The distance of the neighbor’s last recorded path is in the distances object at the neighbor’s data.
    //3.2 Let’s use a variable to hold the key that we will use to access the neighbor’s distance in distances. This will help with code readability.
    //3.3 Still in the .forEach(), create a const variable, neighborValue, and set it to the data property of the neighbor, which is located in the end property of the edge.
    const neighborValue = edge.end.data;

    //3.4 Set up an if condition that checks if the alternate distance is shorter than the value at neighborValue in distances.
    if (alternate < distances[neighborValue]) {
      //4.1 If the condition is satisfied, then we have found a shorter path and should update the neighbor’s recorded distance and previous vertex.
      //4.2 If the alternate path is shorter, set distances at the neighborValue to the new alternate cost.
      distances[neighborValue] = alternate;
      //4.3 We also want to set the previous vertex at the neighborValue to vertex.
      previous[neighborValue] = vertex;
    }
  });

  return { distances, previous };
};

//5.1 When we evaluate the distances, we are determining if the path from the starting vertex to the neighbor is shorter than the previously evaluated distance. Since we have not evaluated any paths to the neighbors yet, the previously recorded distances to all of the neighbors is Infinity. Run the code and look at the output of the function. The shortest paths evaluated so far should be the paths from the starting vertex to its neighbors. In distances we should see the starting vertex with a distance of 0, its neighbors set to the evaluated distances, and all other vertices with Infinity distances. In previous, we should see the neighbors with the starting vertex as their previous vertex, and all other vertices with null.
/*
const results = dijkstras1(testGraph, testGraph.vertices[0]);
console.log(results);

// Output:
{ distances: { A: 0, B: 3, C: 100, D: 4, E: Infinity, F: Infinity, G: Infinity },
  previous: 
   { A: null,
     B: Vertex { data: 'A', edges: [Object] },
     C: Vertex { data: 'A', edges: [Object] },
     D: Vertex { data: 'A', edges: [Object] },
     E: null,
     F: null,
     G: null } }
 */

// 3.Evaluate All Paths
/*
Currently, we’re evaluating the distances to the neighbors of the starting vertex, but we want to expand this to every connected vertex in the graph. Every time we discover a shorter path to a neighbor, we should queue up the neighbor to explore its connections and evaluate them.

This will accomplish two things:

  1. Any paths that have not yet been explored will be explored
  2. For vertices that already have a path found, we will re-evaluate if the alternate path through the neighbor will result in a shorter distance.

We are guaranteed that every vertex is evaluated because whenever a path is found to a vertex, then it will be queued up and its neighbors will be evaluated. The only way for a vertex to escape evaluation is if there are no connections to the vertex.

For our queue, we will use a priority queue. A priority queue is a specialized form of a min-heap, where the priority of a piece of data is stored alongside data, and elements are popped based on the priority value. Take a look through PriorityQueue.js to familiarize yourself with the data structure. We mainly need the .add() method to queue up elements with a priority, and the .popMin() method to grab the element with the lowest priority.

This priority queue is better than a regular queue since it allows us to evaluate the vertices with the shortest distances first. This way we can avoid unnecessarily re-evaluating paths later in the queue since it is less likely that a longer path will result in a shorter distance.
*/

import { PriorityQueue } from "./priorityQueue.js";
const dijkstras2 = (graph, startingVertex) => {
  const distances = {};
  const previous = {};
  //1.1 First, let’s set up the Priority Queue that we will use to hold the vertices we will evaluate as we traverse through the graph. Right after the previous object is instantiated, create a const variable, queue, and set it to a new instance of a PriorityQueue.
  const queue = new PriorityQueue();

  //1.2 The first vertex we want to evaluate is the starting vertex. After instantiating the queue, make a call to .add() the starting vertex to the queue. Pass in an object with the vertex property set to the startingVertex, and the priority property set to 0. The priority is the vertex’s distance to the starting vertex.
  queue.add({ vertex: startingVertex, priority: 0 });

  graph.vertices.forEach((vertex) => {
    distances[vertex.data] = Infinity;
    previous[vertex.data] = null;
  });

  distances[startingVertex.data] = 0;
  //4.1 Our queue is running along, so we just need to set up a loop to go through all of the vertices in the queue. As long as there are vertices left in the queue, we should continue evaluating alternate paths.
  //4.2 After the distance of startingVertex is set to 0, set up a while loop that continues to evaluate the distances as long as the queue is not empty. You can call .isEmpty() on queue to check if it is empty or not. This should come right before the vertices are popped from the queue and end right after we iterate through the neighbors.
  while (!queue.isEmpty()) {
    //2.1 Currently, we are iterating through the startingVertex’s edges and calculating the distance of the alternate path using the startingVertex’s distance. Now, we want to shift to evaluate the vertices in the queue.
    //2.2 Instead of setting the vertex variable to the starting vertex, we want to set it to the vertex with the smallest priority in the queue, which will initially be the starting vertex. Dequeue the vertex with the smallest priority from the queue by calling the .popMin() method and declare the vertex variable by destructuring it from the resulting object.
    const { vertex } = queue.popMin();

    vertex.edges.forEach((edge) => {
      const alternate = edge.weight + distances[vertex.data];
      const neighborValue = edge.end.data;

      //3.1 For now, we only have the startingVertex queued up for evaluation. However, we also want to queue up any neighbors where a shorter distance from the vertex to the neighbor is found. This is because other paths that go through this neighbor could be shorter than what was previously recorded.
      if (alternate < distances[neighborValue]) {
        distances[neighborValue] = alternate;
        previous[neighborValue] = vertex;

        //3.2 If the alternate path to the neighbor is shorter than the previously recorded distance, .add() the vertex’s neighbor to the queue where the vertex property is set to the neighbor, and the priority is the new neighborValue in distances. Remember, the neighbor is located in the end property of the edge connection. We want to add this to the queue after the neighborValue in distances is set to the new alternate distance in order to use the new distance.
        queue.add({ vertex: edge.end, priority: distances[neighborValue] });
      }
    });
  }

  return { distances, previous };
};

// 5.1  We’ve gotten through the basis of Dijkstra’s. Run the function on the test graph and print out the result, you should see the following shortest distances:
/*
// Output:
Output-only Terminal
Output:

{ distances: { A: 0, B: 3, C: 7, D: 4, E: 12, F: 22, G: -38 },
  previous: 
   { A: null,
     B: Vertex { data: 'A', edges: [Object] },
     C: Vertex { data: 'D', edges: [Object] },
     D: Vertex { data: 'A', edges: [Object] },
     E: Vertex { data: 'D', edges: [Object] },
     F: Vertex { data: 'E', edges: [Object] },
     G: Vertex { data: 'E', edges: [Object] } } }
*/
