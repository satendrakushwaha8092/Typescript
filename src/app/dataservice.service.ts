import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@ Injectable({providedIn:"root"})

export class DataserviceService {

//   constructor(private http: HttpClient) {}
//   userData:any;
//     getData(): void {
//     this.http.get("http://localhost:3000/user").subscribe(
//         (userData: any) => {
//             // Handle the retrieved user data here
//             this.userData=userData;
//         },
//         (error: any) => {
//             console.error('Error fetching user data:', error);
//         }
//     );
// }

// deleteData(id:any): void {
//   this.http.delete("http://localhost:3000/user/"+id).subscribe(
//       (userData: any) => {
//           // Handle the retrieved user data here
//           console.log(userData);
//       },
//       (error: any) => {
//           console.error('Error fetching user data:', error);
//       }
//   );
// }

}
