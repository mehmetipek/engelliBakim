import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-healthPlanList',
  templateUrl: './healthPlanList.component.html',
  styleUrls: ['./healthPlanList.component.scss']
})
export class HealthPlanListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public _planList = [
    {
      "code": "SAĞ.PLN.001",
      "name": "İlaç Tedavi Planı",
      "link":  "../ilac-tedavi-plan-list"
    },
    {
      "code": "SAĞ.PLN.002",
      "name": "Kişisel Sağlık Bakım Planı",
      "link": "../kisisel-saglik-bakim-plani-list"
    }, {
      "code": "SAĞ.PLN.003",
      "name": "Engelli Periyodik Muayene Takip Formu",
      "link": "../engelli-periyodik-muayene-form"
    }, {
      "code": "SAĞ.PLN.004",
      "name": "Haftalık Hastahane Gidiş Planı",
      "link": "/"
    }
  ]
}
