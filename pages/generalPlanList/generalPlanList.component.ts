import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generalPlanList',
  templateUrl: './generalPlanList.component.html',
  styleUrls: ['./generalPlanList.component.scss']
})
export class GeneralPlanListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public _planList = [
    {
      "code": "GNL.PLN.001",
      "name": "Yıllık Eğitim Planı",
      "link": "/"
    },
    {
      "code": "GNL.PLN.002",
      "name": "Bakım Onarım Planı",
      "link": "/"
    }, {
      "code": "GNL.PLN.003",
      "name": "Yıllık İç Tetkik Planı",
      "link": "/"
    }, {
      "code": "GNL.PLN.004",
      "name": "Temizlik Planı",
      "link": "/"
    }, {
      "code": "GNL.PLN.005",
      "name": "Kalite Yönetim Sistem Planı",
      "link": "/"
    }, {
      "code": "GNL.PLN.006",
      "name": "Kalite Hedefleri Planı",
      "link": "/"
    }]
}
