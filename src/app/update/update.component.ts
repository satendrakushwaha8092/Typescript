import { Component } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  userData:any
  constructor(private userdata: UserdataService){
   userdata.getData('').subscribe(
    (userData: any) => {
        // Handle the retrieved user data here
        this.userData=userData;
         console.log(this.userData)
    },
    (error: any) => {
        console.error('Error fetching user data:', error);
    }
);
  }
}
