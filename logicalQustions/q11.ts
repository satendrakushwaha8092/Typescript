function prime(num:number){
    for(let i=0;i<num;i++){
        let c=0
        for(let j=0;j<i;j++){
            if(i%j==0) c++
        }
        if(c==1) console.log(i)
    }
}

prime(100)