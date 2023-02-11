import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { Disabled } from '../../models/Disabled';

@Component({
  selector: 'app-vocationalRegistry',
  templateUrl: './vocationalRegistry.component.html',
  styleUrls: ['./vocationalRegistry.component.scss']
})
export class VocationalRegistryComponent implements OnInit {
  @Input("no") no:number;
  @Output("getNo") setNo= new EventEmitter<number>();
   public engelli: Disabled;
   
  public _workRecordBookList : WorkRecordBook []=[];
  public _workRecordBook : WorkRecordBook= new WorkRecordBook();
  constructor(private service: AppServiceService, private modalService: NgbModal, private route: ActivatedRoute,
  private router: Router, private toasterService: ToasterService, private localeService: BsLocaleService) {  }
  ngOnInit() {
  }
  public getListWorkRecordBook() {
    console.log("getListWorkRecordBook");
    this.service.postWithPostModel<ResModel<WorkRecordBook[]>, number>("getListWorkRecordBook", this._workRecordBook.mckdbmid).subscribe(
      res => {
        console.log(res);
        this._workRecordBookList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  addWorkRecordBook(){
    
  }
  
  }
export class WorkRecordBook{
  public  id:number;
  public  mckdbmid:number;
  public  mckdsirano:number;
  public  mckdtarih:Date;
  public  mckdturu:string;
  public  mckdkonusu:string;
  public  mckdacklm:string;
  public  mckdmes_elm_adi:string;
  public  mckduserid:number;
  public  mckddatetime:Date;
  public  updatedate:Date;
}