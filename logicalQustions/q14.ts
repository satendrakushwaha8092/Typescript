// let arr=[80, 60, 10, 50, 30, 100, 0, 50]
// let count = 0;
// for(let i = 0; i < arr.length; i++){
//     for(let j = i+1; j < arr.length; j++){
//       if(arr[i] + arr[j] == 100){
//         console.log(arr[i],arr[j])
//         count++;
//       }
//     }
// }
// console.log(count);

let arr2=[80, 60, 10, 50, 30, 100, 0, 50]
arr2.sort(function(a, b){return a - b})

let i=0;
let j=arr2.length-1
let count=0
while (i<j) {

if(arr2[i]+arr2[j]==100){
    console.log(arr2[i],arr2[j])
    count ++
    i++
    j--
}
else if(arr2[i]+arr2[j]>100) j--
else i++
}
console.log(count)