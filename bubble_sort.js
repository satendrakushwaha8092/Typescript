let swapped = true;
function bubbleSort1(arr) {
  for (let i = 0; i < arr.length && swapped; i++) {
    swapped = false;
    for (let j = 1; j < arr.length; j++) {
      if (arr[j - 1] >= arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        swapped = true;
      }
    }
  }
  return arr;
}

console.log(bubbleSort1([1, 2, 3, 4, 5, 6]));

function bubbleSort2(arr) {
  for (let i = 0; i < arr.length; i++) {
    swapped = false;
    for (let j = 1; j < arr.length; j++) {
      if (arr[j - 1] <= arr[j]) {
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
        //swapped=true
      }
    }
  }
  return arr;
}

console.log(bubbleSort2([1, 2, 3, 4, 5, 6]));

function bubbleSort3(arr) {
  for (let pass = arr.length - 1; pass >= 0; pass--) {
    for (let i = 0; i <= pass-1; i++) {
      if (arr[i] >= arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort3([1, 2, 3, 40, 5, 6]));
