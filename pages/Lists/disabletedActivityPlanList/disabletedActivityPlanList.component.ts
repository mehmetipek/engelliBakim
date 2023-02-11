import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../../../services/appService.service';
import { ResModel } from '../../../../models/resModel';

@Component({
  selector: 'app-disabletedActivityPlanList',
  templateUrl: './disabletedActivityPlanList.component.html',
  styleUrls: ['./disabletedActivityPlanList.component.scss']
})
export class DisabletedActivityPlanListComponent implements OnInit {

  constructor(private service: AppServiceService) { }
  public _activityList: ActivityPlan[] = [];
  public _activityView : ActivityPlan= new ActivityPlan();

  public _yil: number;

  ngOnInit() {
    this._yil=null;
  }
  public getActivityList(yil?) {
    let tarih: number[] = [];
    tarih.push(yil ? yil : this._yil);
    this.service.postWithPostModel<ResModel<ActivityPlan[]>, number>("getActivityisYear", tarih[0]).subscribe(
      res => {
        console.log(res);
        this._activityList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
export class ActivityPlan {
  public id: number;
  public ep_mesleki_kayit_no: number;
  public ep_ay: number;
  public ep_yil: number;
  public _mes_sira_no:number;
  constructor(){
    this.ep_yil=null;
  }
}
