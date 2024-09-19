import { binarySearch } from './binarySearch.js'

const searchable = [1, 2, 7, 8, 22, 28, 41, 58, 67, 71, 94];
const target = 94;

const targetIndex = binarySearch(searchable, target);

// console.log(`The target index is ${targetIndex}.`);
