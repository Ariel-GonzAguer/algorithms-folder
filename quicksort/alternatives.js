// usando metodos array.
// es más legible y corto, pero consume más memoria.
function quickSortWithArrayMethods(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);

  return [...quickSortWithArrayMethods(left), ...middle, ...quickSortWithArrayMethods(right)];
}

// implentación de Claude 3.5
// Esta implementación es más eficiente en términos de memoria y tiempo de ejecución, pero es más compleja de entender.
function quickSortClaude(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partitionClaude(arr, low, high);
    quickSortClaude(arr, low, pivotIndex - 1);
    quickSortClaude(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partitionClaude(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambio
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Colocar el pivote en su posición final
  return i + 1;
}

// implementación de CodeCademy mejorada por Claude 3.5

// Función para intercambiar dos elementos en un array
const swap = (arr, indexOne, indexTwo) => {
  const temp = arr[indexTwo];
  arr[indexTwo] = arr[indexOne];
  arr[indexOne] = temp;
};

// Función principal de quicksort
const quicksortImproved = (array, leftBound = 0, rightBound = array.length - 1) => {
  // Si el subarray tiene más de un elemento
  if (rightBound > leftBound) {
    // Obtener el índice del pivote
    const pivotIndex = partitionImproved(array, leftBound, rightBound);

    // Ordenar recursivamente la parte izquierda (menores que el pivote)
    quicksortImproved(array, leftBound, pivotIndex - 1);

    // Ordenar recursivamente la parte derecha (mayores que el pivote)
    quicksortImproved(array, pivotIndex + 1, rightBound);
  }
  return array;
};

// Función para particionar el array
const partitionImproved = (array, leftIndex, rightIndex) => {
  // Elegir el elemento central como pivote
  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];

  // Continuar mientras los índices no se crucen
  while (leftIndex <= rightIndex) {
    // Encontrar un elemento en la izquierda que debería estar en la derecha
    while (array[leftIndex] < pivot) {
      leftIndex++;
    }
    // Encontrar un elemento en la derecha que debería estar en la izquierda
    while (array[rightIndex] > pivot) {
      rightIndex--;
    }
    // Si los índices no se han cruzado, intercambiar los elementos
    if (leftIndex <= rightIndex) {
      swap(array, leftIndex, rightIndex);
      leftIndex++;
      rightIndex--;
    }
  }
  // Devolver el índice donde se divide el array
  return leftIndex;
};

console.log(quickSortWithArrayMethods([4, 2, 7, 1, 3]));
console.log(quickSortClaude([4, 2, 7, 1, 3]));
console.log(quicksortImproved([4, 2, 7, 1, 3]));

const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;

const memoryData = process.memoryUsage();

console.log(`Uso de memoria:`);
console.log(`  RSS: ${formatMemoryUsage(memoryData.rss)}`); // Resident Set Size
console.log(`  Heap total: ${formatMemoryUsage(memoryData.heapTotal)}`);
console.log(`  Heap usado: ${formatMemoryUsage(memoryData.heapUsed)}`);
console.log(`  Memoria externa: ${formatMemoryUsage(memoryData.external)}`);