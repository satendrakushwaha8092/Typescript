import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  show = false;
  login(){
    console.log("login")
    this.show=true

  }
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
constructor(public dialog: MatDialog) {}
  myCart(product:any){
    this.item.push(product)
    console.log(this.item)
  }

  showCart(){
    console.log(this.item)
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'login.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {
  show=false

}


