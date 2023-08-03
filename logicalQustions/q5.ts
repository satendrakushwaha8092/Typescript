function missingelement(ele:number[]){
    let s=0
    for(let i=0;i<ele.length;i++){
        s=s+ele[i]
    }
    return (((ele.length+1)*(ele.length+2))/2)-s
}

console.log(missingelement([1,2,3,4,6,7,8,9]))