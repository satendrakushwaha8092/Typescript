let arr=[1,1,2,2,2,3,3,3,3,4,4,4,4,0,0]
for(let i=0; i<arr.length; i++){
 for(let j=i; j<arr.length; j++){
    if(arr[i]==arr[j]){
        arr.splice(j,1)
    }
 }   
}
console.log(arr)

console.log(2)
setTimeout(()=>console.log(3),1000)
console.log(4)
setTimeout(()=>console.log(5),0)