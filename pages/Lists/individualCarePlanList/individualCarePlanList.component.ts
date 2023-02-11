import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppServiceService } from '../../../../services/appService.service';
import { ResModel } from '../../../../models/resModel';
import { BsLocaleService } from 'ngx-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PdfViewerComponent } from '../../../../components/pdfViewer/pdfViewer.component';


@Component({
  selector: 'app-individualCarePlanList',
  templateUrl: './individualCarePlanList.component.html',
  styleUrls: ['./individualCarePlanList.component.scss']
})
export class IndividualCarePlanListComponent implements OnInit {
  public individualCarePlanList: IndividualCarePlanViewModel[] = [];
  public individualCarePlan: IndividualCarePlan = new IndividualCarePlan();//Bireysel Bakım  
  public filter:IndividualCarePlanServiceFilterModel=new IndividualCarePlanServiceFilterModel();
  @ViewChild('pdfViewerCom') pdfViewerCom: PdfViewerComponent;

  constructor(private service: AppServiceService, private localeService: BsLocaleService, private http: HttpClient) { this.localeService.use('tr'); }
  ngOnInit() {
    this.getIndividualCarePlanList();
  }

  //-----------------------------------------
  getIndividualCarePlanList() {
    console.log("getListIndividualCarePlan");
    this.service.postWithPostModel<ResModel<IndividualCarePlanViewModel[]>, number>("getListIndividualCarePlan", this.individualCarePlan.id).
      subscribe(
        res => {
          this.individualCarePlanList = res.data;
          console.log(res.data);
        },
        err => { console.log(err); }
      );
  }
  /**Plan kapatma */
  closeIndividualCarePlanPage(id: number) {
    console.log("closeIndividualCarePlanPage");
    this.individualCarePlan.id = id;
    if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
      this.service.postWithPostModel<ResModel<IndividualCarePlan>, number>("closeIndividualCarePlanPage", this.individualCarePlan.id).
        subscribe(
          res => {
            console.log(res);
            this.getIndividualCarePlanList();
          },
          err => { console.log(err); }
        );
  }
  getPdf(item: IndividualCarePlan) {
    this.pdfViewerCom.getPdf("getReport", item.id);
  }
  search() {
    this.service.postWithPostModel<ResModel<IndividualCarePlanViewModel[]>,IndividualCarePlanServiceFilterModel>("IcpGetFilter",this.filter,true)
    .subscribe(
      res=>{
        console.log(res);
        this.individualCarePlanList=res.data;
      },
      err=>{console.log(err);}
    );
  }
}
export class IndividualCarePlanServiceFilterModel {
  public _ikadisoyadi: string;
  public planbastar: Date;
  public planbitistar: Date;
  public aktif_kayit: Boolean=true;
}
export class IndividualCarePlan {
  public id: number;
  public bmid: number;
  public kurucu_id: number;
  public engelli_ikid: number;
  public duzenlemetar: Date;
  public planbastar: Date;
  public planbitistar: Date;
  public yenidendegtar: Date;
  public bmadres: string;
  public engellihiztur: string;
  public bbpkapkayittar: Date;
  public bbpuser_id: number;
  public bbpdatetime: Date;
  public aktif_kayit: boolean;
  public updatedate: Date;
  public _mes_sira_no_id: number;
  public bbp_mesleki_kayit_no_id: number;
}
export class IndividualCarePlanViewModel {

  public id: number;
  public ikadisoyadi: string;
  public planbastar: Date;
  public planbitistar: Date;
  public yenidendegtar: Date;
  public duzenlemetar: Date;
  public mckdsirano: number;
}
