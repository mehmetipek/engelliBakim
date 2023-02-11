import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }
  public _photoUrl = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";

  ngOnInit() {
  }

}
