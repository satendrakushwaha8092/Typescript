function secodedMax(ele){
    let max=ele[0]
    for(let i=0;i<ele.length;i++){
        if(ele[i]>max){
            max = ele[i];
        }
    }
    return max
}

console.log(secodedMax([3,5,2,7,9,4]))