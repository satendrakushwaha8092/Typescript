const a:string="a"
const b:number =20
const c:number[] =[1,2,3,4,5,6,7,8,9,10]
const d:string[] =['q','1','f','g','h','i','j','k','l','q']
let decimal: number = 6.1;
decimal=50
let arrData:any[]=[1,true,'asdf']
console.log(decimal)

arrData.push(false)
console.log(arrData)

enum color {red=1, green=2, blue=3, alpha=4}
console.log(color)

let message
message='abc'
const res=(<string>message).endsWith('c')
console.log(res)