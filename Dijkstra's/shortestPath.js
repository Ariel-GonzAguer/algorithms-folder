import { dijkstras2 as dijkstras } from "./Dijkstras.js";
import { testGraph } from "./testGraph.js";

//1.1 We should first supply our shortestPathBetween() function with the graph, starting vertex, and target vertex.
//1.2 Add 3 parameters to the shortestPathBetween() function: graph, startingVertex, and targetVertex.
const shortestPathBetween = (graph, startingVertex, targetVertex) => {
  //2.1 Now we should make a call to dijkstras() to retrieve the shortest distances and previous vertices.
  //2.2 Call dijkstras() and pass the given graph and startingVertex as arguments. Destructure distances and previous from the resulting output.
  const { distances, previous } = dijkstras(graph, startingVertex);

  //3.1 We will want to return the shortest distance from the starting vertex to the target vertex. We can access this in distances using the targetVertex’s data.
  //3.2 After the call to dijkstras(), create a distance constant and set it to the target vertex’s shortest distance in distances.
  const distance = distances[targetVertex.data];

  //4.1 We also want to construct the path and return it back. Since each entry in previous is a reference to the previous vertex in the shortest path, we can walk backwards through the previous vertices and store the vertex in our path. This is similar to a linked list traversal, just in reverse.
  //4.2 After the distance is created, create another variable, path, and set it to an empty array.
  const path = [];
  //4.4 Then create a temporary variable (let), vertex, and set it to the targetVertex. This is the end of the path where we will start our backwards traversal.
  let vertex = targetVertex;

  //5.1 We will add the vertex into the path, set the next vertex to the previous vertex, and repeat until there are no vertices left in the path. To do this, we will set up a while loop to control the iterations.
  //5.2 When there are no vertices left, then the vertex will be null. After the temporary vertex is initialized, set up a while loop that continues to run as long as vertex is not null.
  while (vertex) {
    //5.3 Inside the loop, .unshift() the vertex into the path. This will allow the vertex to be inserted at the beginning of the array instead of the end.
    path.unshift(vertex);

    //5.4 We will also want to update the vertex to be the previous vertex so it can get added in. Set vertex to the vertex’s data in previous.
    vertex = previous[vertex.data];
  }

  //3.3 Then, return the distance in an object with the distance property set to distance.
  //4.3 Go ahead and add the path to the return object.
  return { distance, path };
};

// Retrieve shortest path between vertices A and G
const a = testGraph.getVertexByValue("A");
const g = testGraph.getVertexByValue("G");
const results = shortestPathBetween(testGraph, a, g);

console.log(results);

/*
output:
Output-only Terminal
Output:

{ distance: -38,
  path: 
   [ Vertex { data: 'A', edges: [Object] },
     Vertex { data: 'D', edges: [Object] },
     Vertex { data: 'E', edges: [Object] },
     Vertex { data: 'G', edges: [] } ] }
 */
