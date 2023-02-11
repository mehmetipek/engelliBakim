import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss']
})
export class LogbookComponent implements OnInit {
  public _photoUrl: string = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  constructor(private service: AppServiceService ,private localeService: BsLocaleService,private http: HttpClient) { this.localeService.use('tr');}
  public getLogList=[];
  ngOnInit() {
    this.getLogBook();
  }

  public getLogBook() {
    console.log("getLogBook");
    this.service.postWithPostModel<ResModel<any>, number>("getLogBook",this.service.getCareCenterId()).subscribe(
      res => {
        console.log(res);
       this.getLogList=res.data;
       for(var i=0;i<res.data.length;i++){
        res.data[i].ikfoto="data:image/png;base64,"+res.data[i].ikfoto;
        this.getLogList=res.data;
      }
      },
      err => {
        console.log(err);
      }
    );
  }

}
