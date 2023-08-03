function reverse(n: number){
let s=0
    while(n>0){
        let r=n%10
        s=s*10+r
        n=Math.floor(n/10)
    }
    return s
}

console.log(reverse(123456))