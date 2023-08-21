import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  constructor() { }

  @ Input() item='0'

  @ Input() token='0'

  @Output() updateDataEvent = new EventEmitter<string>();

  ngOnInit(): void {
    console.log(this.item);
    console.log(">>>>>>>>>",this.token);
  }

}
