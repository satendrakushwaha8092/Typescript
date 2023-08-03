function evenList(list:number[]){
    for(let i=0;i<list.length;i++){
        if(list[i]%2==0)
        console.log(list[i]);
    }
}

evenList([1,2,3,4,5,6,7,8,9])