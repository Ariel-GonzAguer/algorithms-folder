// La implementación clásica del algoritmo de Dijkstra que te mostré anteriormente funciona, pero no es la más eficiente. La eficiencia del algoritmo depende de cómo manejamos la cola de prioridad y la estructura de los grafos. La mejor implementación hasta la fecha está basada en utilizar un montículo (heap) como cola de prioridad, ya que las operaciones de extracción e inserción se pueden hacer en tiempo O(log⁡n)O(logn), lo que reduce significativamente el tiempo de ejecución en comparación con una cola de prioridad basada en listas.
// Eficiencia Mejorada: Usando un Min-Heap (Binary Heap o Fibonacci Heap)

//     La implementación más comúnmente utilizada usa un min-heap binario, que garantiza las operaciones de inserción y extracción en O(log⁡n)O(logn).
//     En situaciones más avanzadas, se puede utilizar un Fibonacci heap, que mejora las operaciones de disminución de claves a O(1)O(1), lo que permite una ejecución teórica en O(∣E∣+∣V∣log⁡∣V∣)O(∣E∣+∣V∣log∣V∣), donde EE es el número de aristas y VV es el número de vértices.

// Implementación Optimizada con Min-Heap (Binary Heap)

// Esta es la versión optimizada utilizando un min-heap:

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (parent.priority <= element.priority) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const minHeap = new MinHeap();

  // Inicializar las distancias y nodos previos
  for (let vertex in graph) {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  }

  distances[start] = 0;
  minHeap.insert({ vertex: start, priority: 0 });

  while (!minHeap.isEmpty()) {
    const { vertex: u } = minHeap.extractMin();

    // Procesar los vecinos
    for (let neighbor in graph[u]) {
      let distance = distances[u] + graph[u][neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = u;
        minHeap.insert({ vertex: neighbor, priority: distance });
      }
    }
  }

  return { distances, previous };
}

// Ejemplo de grafo
const graph = {
  A: { B: 4, C: 2 },
  B: { A: 4, C: 1, D: 5 },
  C: { A: 2, B: 1, D: 8, E: 10 },
  D: { B: 5, C: 8, E: 2, Z: 6 },
  E: { C: 10, D: 2, Z: 3 },
  Z: { D: 6, E: 3 },
};

const result = dijkstra(graph, 'A');
console.log(result);

// Explicación de las Mejoras:

//     Min-Heap: En lugar de usar una cola de prioridad con una lista ordenada, usamos un min-heap. Esto reduce el tiempo de inserción y extracción a O(log⁡n), en lugar de O(n) con una lista ordenada.

//     Optimización de Complejidad: Con el uso del min-heap, el tiempo de ejecución del algoritmo es O(∣E∣log⁡∣V∣). Esto es una mejora significativa cuando se compara con el O(∣V∣2) de la implementación más simple (sin heap).

//     Escalabilidad: Esta implementación es mucho más eficiente y escalable para grafos grandes, ya que las operaciones de inserción y extracción son mucho más rápidas.

// Mejora Teórica con Fibonacci Heap

// Para una mejora teórica adicional, puedes usar un Fibonacci heap. Aunque en la práctica, los Fibonacci heaps son más complicados y pueden no ser tan eficientes en sistemas reales debido a la sobrecarga de manipular estructuras más complejas. Sin embargo, un Fibonacci heap permite disminuir claves en O(1), lo que reduce el tiempo total del algoritmo a O(∣E∣+∣V∣log⁡∣V∣).
// Resumen:

//     Complejidad: La mejor implementación práctica del algoritmo de Dijkstra utiliza un min-heap binario, logrando una complejidad de O(∣E∣log⁡∣V∣)O(∣E∣log∣V∣).
//     Escalabilidad: Esta implementación es ideal para grafos grandes donde las operaciones de encolado y desencolado se vuelven más costosas.
//     Alternativa teórica: El Fibonacci heap ofrece una mejora teórica, pero es más complejo de implementar y su rendimiento en aplicaciones reales puede no ser superior al del min-heap binario en todas las situaciones.

// Esta implementación optimizada es ampliamente utilizada y proporciona un excelente balance entre simplicidad y rendimiento.