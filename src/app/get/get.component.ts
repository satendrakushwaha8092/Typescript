import { Component, OnInit } from '@angular/core';

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})

@ Injectable({providedIn:"root"})

export class GetComponent implements OnInit {
  constructor(private http: HttpClient) {}
  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const length = event.length;
    
    // Here you can call your function or perform any desired actions
    // based on the page change event.
    // For example:
    // console.log(`Page Index: ${pageIndex}`);
    // console.log(`Page Size: ${pageSize}`);
    // console.log(`Total Items: ${length}`);
        this.getData('',pageIndex,pageSize);
    // Call your function here
    // yourFunction(pageIndex, pageSize, length);
  }
    ngOnInit(): void {
        this.getData();
    }
  userData:any;
  name:any
    getData(search?:any,page?:any,pageSize?:any): void {
    this.http.get("http://localhost:3000/user"+'?search='+search+'&'+'page='+page+'&'+'pagesize='+pageSize).subscribe(
        (userData: any) => {
            // Handle the retrieved user data here
            this.userData=userData;
        },
        (error: any) => {
            console.error('Error fetching user data:', error);
        }
    );
}

deleteData(id:any): void {
  this.http.delete("http://localhost:3000/user/"+id).subscribe(
      (userData: any) => {
          // Handle the retrieved user data here
          console.log(userData);
      },
      (error: any) => {
          console.error('Error fetching user data:', error);
      }
  );
}

getDataById(id:any): void {
    this.http.get("http://localhost:3000/user/"+id).subscribe(
        (userData: any) => {
            // Handle the retrieved user data here
            console.log(userData);
        },
        (error: any) => {
            console.error('Error fetching user data:', error);
        }
    );
  }
}
