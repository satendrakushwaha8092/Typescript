// function max(arr){
//     let max=null
//     let max2=null
//     for(let i=0; i<arr.length; i++){
//         if(arr[i] >max){
//             max2=max
//             max=arr[i]
//         }else if(arr[i]>max2||arr[i]<max2){
//             max2=arr[i]
//         }
//     }
//     return max2
// }

// let arr = [1,2,3,99,98,101,100]

// console.log(max(arr))

function max(arr) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.get(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }
  
  let max = null;
  let max2 = null;
  for (let ele of map) {
    //console.log(ele[0])
    if (ele[0] > max) {
      max2 = max;
      max = ele[0];
    } else if (ele[0] > max2) {
      max2 = ele[0];
    }
  }
  return max2;
}

let arr = [
  1, 2, 3, 99, 98, 101, 100, 100, 200, 150, 150, 655, 999, 53, 11, 650, 2,
];

console.log(max(arr));
