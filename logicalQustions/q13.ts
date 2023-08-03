function duplicateElements(ele:any){
    let newarr=[]
    for(let i=0; i<ele.length; i++){
        for(let j=0; j<i; j++){
            if(ele[i]==ele[j]) newarr.push(ele[i])
        }
    }
    return newarr
}

console.log(duplicateElements([1,2,3,4,1,2,1]))

function duplicateElements2(ele:any){
        const map=new Map
        for(let i=0;i<ele.length;i++){
            if(map.get(ele[i])){
                map.set(ele[i],map.get(ele[i])+1);
            }else{
                map.set(ele[i],1)
            }
        }
        return map

}
console.log(duplicateElements2([1,2,3,4,1,2,1]))
