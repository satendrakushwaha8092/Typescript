function fib(n:number) {
    let a:number=0
    let b:number=1
    let c:number
    for(let i = 0; i < n; i++) {
        c=a+b
        console.log(c)
        a=b
        b=c
    }
}

fib(10)