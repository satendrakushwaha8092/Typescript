let arr=[14,11,10,9,6,1,3,13,2,5,7,4,8,12]
let max1=arr[0]
let max2=arr[1]
let max3=arr[2]
for(let i=3;i<arr.length;i++){
    if(max1<arr[i]){
        max3=max2
        max2=max1
        max1=arr[i]
    }else if(arr[i]>max2 && arr[i]<max1){
        max3=max2
        max2=arr[i]
    }else if(arr[i]>max3 && arr[i]<max2 && arr[i]<max1){
        max3=arr[i]
    }
}
console.log(max3)