import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workRegistry',
  templateUrl: './workRegistry.component.html',
  styleUrls: ['./workRegistry.component.scss']
})
export class WorkRegistryComponent implements OnInit {

  @Input() _meslekiSiraNo: number;
  public _workRecordBook: WorkRecordBook = new WorkRecordBook();
  
  @Output() workRegistrySubmit = new EventEmitter<WorkRecordBook>();
  constructor(private service:AppServiceService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.workRegistrySubmit.emit(this._workRecordBook);
  }

  public addWorkRecordBook() {
    if (this._workRecordBook.id > 0) {
      this.updateWorkRecordBook();
    } else {
      this.insertWorkRecordBook();
    }
  }
  public insertWorkRecordBook(): Observable<ResModel<WorkRecordBook>> {
   return this.service.postWithPostModel<ResModel<WorkRecordBook>, WorkRecordBook>("insertWorkRecordBook",this._workRecordBook,true);
  }
  public updateWorkRecordBook(): Observable<ResModel<WorkRecordBook>> {
    return this.service
      .postWithPostModel<ResModel<WorkRecordBook>, WorkRecordBook>(
        "updateWorkRecordBook",
        this._workRecordBook,
        true
      );
  }
  public closeWorkRecordBook() {
    if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
      this.service
        .postWithPostModel<ResModel<string>, number>(
          "closeWorkRecordBook",
          this._workRecordBook.id,
          true
        )
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
  }


}
export class WorkRecordBook {
  public id: number;
  public mckdbmid: number;
  public mckdsirano: number;
  public mckdtarih: Date;
  public mckdturu: string;
  public mckdkonusu: string;
  public mckdacklm: string;
  public mckdmes_elm_adi: string;
  public mckduserid: number;
  public mckddatetime: Date;
  public updatedate: Date;
}