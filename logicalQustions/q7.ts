let arr=[0,1]
for(let i=2;i<10;i++){
    arr[i]=arr[i-1]+arr[i-2]
}
console.log(arr)