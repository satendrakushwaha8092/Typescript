import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products=[
    {
      id:1,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\product_images\Screenshot 2023-09-01 123526.png"
    },
    {
      id:2,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\assets\product_images\Screenshot 2023-09-01 123526.png"

    },
    {
      id:3,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\assets\product_images\Screenshot 2023-09-01 123526.png"

    },
    {
      id:4,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\assets\product_images\Screenshot 2023-09-01 123526.png"

    },
    {
      id:5,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\assets\product_images\Screenshot 2023-09-01 123526.png"

    },
    {
      id:6,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\assets\product_images\Screenshot 2023-09-01 123526.png"

    },
    {
      id:7,
      productName: 'name1',
      price:1200,
      description:"qwertyuiodrfctvgbhnjmk,lfghbnjkml,fghbjnmk",
      image:"\assets\product_images\Screenshot 2023-09-01 123526.png"

    },
  ]
  item: number[] = [];
constructor() {}
  myCart(product:any){
    this.item.push(product)
    console.log(this.item)
  }

  showCart(){
    console.log(this.item)
  }

}
