import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  template: `
  <button (click)="onSave()"> save </button>
  `
  // templateUrl: './course.component.html',
  // styleUrls: ['./course.component.css']
})
export class CourseComponent {
  onSave = () => {
    console.log("_________")
  }
}
