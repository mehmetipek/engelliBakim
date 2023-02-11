import { Component, OnInit } from '@angular/core';
import { CareCenter } from '../../models/careCenter';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { NotificationTypes } from '../../enums/notificationTypes.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
    this.getMainMonitor();
  }

  isAvaible = false;
  public BM: CareCenter = new CareCenter();
  public mainMonitorData: MainMonitor = new MainMonitor();
  constructor(private service: AppServiceService) {
    //this.getCareCenterLicenses();
    this.getMainMonitor();
  }
  public colors: string;
  public getMainMonitor() {
    this.service.postWithPostModel<ResModel<MainMonitor>, number>("getMainMonitor", this.service.getCareCenterId())
      .subscribe(
        res => {
          console.log(res);
          this.mainMonitorData = res.data;
          if (res.message == "eksik") {
            this.isAvaible = true;
          }

          // this.mainMonitorData.totalDisabledMan=55;
          // this.mainMonitorData.totalDisabledWom=150;

        },
        err => {
          console.log(err);
        }
      );
  }
  showToast(error: NotificationTypes, arg1: string, arg2: string): any {
    throw new Error("Method not implemented.");
  }
}

export class MainMonitor {

  public toplamPersonel: number;
  public meslekiPersonel: string;
  public bakiciPersonel: number;
  public saglikPersoneli: number;
  public toplamAktifPersonel: number;
  public toplamEngelli: number;
  public toplamAktifEngelli: number;
  public toplamYatakKap: number;
  public toplamErkekKap: number;
  public toplamKadinKap: number;
  public zbrPost: MainMonitorZBRPostClass[];

}
export class MainMonitorZBRPostClass {
  public yatakKap: string;
  public erkekKap: string;
  public kadinKap: string;
  public engelliGrubu: string;
  public aktif: boolean;
}