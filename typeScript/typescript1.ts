let ourTuple: [number, boolean, string];
ourTuple=[1,true,'asd']
console.log(ourTuple)

const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
  };

car.year=2022

const car2: { type: string, mileage?: number } = { // no error
    type: "Toyota"
  };
  car2.mileage = 2000;

console.log(car2)

// const nameAgeMap: { [index: string]: number } = {};
// nameAgeMap.Jack = 25; // no error
// nameAgeMap.Mark = 23; // Error: Type 'string' is not assignable to type 'number'.


type CarYear = number
type CarType = string
type CarModel = string
type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
}

const carYear: CarYear = 2001
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const car3: Car = {
  year: carYear,
  type: carType,
  model: carModel
};

console.log(car3)

interface Rectangle {
    height: number,
    width: number
  }
  
  const rectangle: Rectangle = {
    height: 20,
    width: 10
  };

console.log(rectangle);

interface ColoredRectangle extends Rectangle {
    color: string
  }
  
  const coloredRectangle: ColoredRectangle = {
    height: 20,
    width: 10,
    color: "red"
  };

  console.log(coloredRectangle);

  function printStatusCode(code: string | number) {
    console.log(`My status code is ${code}.`)
  }
  printStatusCode(404);
  printStatusCode('404');
  
  function add(a: number, b: number, c?: number) : number {
    return a + b + (c || 0);
  }

  console.log(add(1,2,3));

  let x: unknown = 'hello';
console.log((<string>x).length);
  

class Person {
    private name: string;
  
    public constructor(name: string) {
      this.name = name;
    }
  
    public getName(): string {
      return this.name;
    }
  }
  
  const person = new Person("Jane");
  console.log(person.getName());