function swapping(a: number, b: number){
    a=a+b
    b=a-b
    a=a-b
    return [a,b]
}

console.log(swapping(10,20))