function fact(r){
    let f=1
    for(let i=1;i<=r;i++){
        f=f*i
    }
    return f
}

function specialNumber(n){
        const x=n
        let sum=0
        while(n>0){
            r=n%10
            sum=sum+fact(r)
            n=Math.floor(n/10)
        }
        if(x==sum) return true
        else return false
}

console.log(specialNumber(145))