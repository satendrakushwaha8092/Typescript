function reverseString(str:string){
    return str.split('').reverse().join('').split(' ').reverse().join(' ')
}

console.log(reverseString('satendra kushwaha'))
