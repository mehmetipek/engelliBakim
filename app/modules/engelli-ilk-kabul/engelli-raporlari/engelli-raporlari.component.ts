import { Component, OnInit, ViewChild } from '@angular/core';
import { Disabled } from '../../../models/Disabled';
import { DataOperations } from '../../../enums/DataOperations.enum';
import { ToasterService } from 'angular2-toaster';
import { BsLocaleService, ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';
import { NotificationTypes } from '../../../enums/notificationTypes.enum';
import { ImageOperationComponent } from '../../../components/imageOperation/imageOperation.component';
@Component({
  selector: 'app-engelli-raporlari',
  templateUrl: './engelli-raporlari.component.html',
  styleUrls: ['./engelli-raporlari.component.scss']
})
export class EngelliRaporlariComponent implements OnInit {
  public engelli: Disabled;
  @ViewChild('engelliRaporlari') public engelliRaporlari: ModalDirective;
  @ViewChild('lisansRapor') lisansRapor: ImageOperationComponent;
  
  public _disabilityReportList: DisabilityReport[] = [];
  public _disabilityReport: DisabilityReport = new DisabilityReport();

  public ikid:number=-1;

  public _disabilityReport_operation: DataOperations;

  constructor(private service: AppServiceService,private route: ActivatedRoute,private router: Router,
     private toasterService: ToasterService, private localeService: BsLocaleService) {
    this.engelli = new Disabled();
    this.localeService.use('tr');
   }
  ngOnInit() {
    this._disabilityReport = new DisabilityReport();
    this._disabilityReport._reportimage = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';
  }
  public getListDisabilityReportList() {
    console.log("getListDisabilityReport ikid: " + this.ikid);
    this.service.postWithPostModel<ResModel<DisabilityReport[]>, number>("getListDisabilityReport", this.ikid).subscribe(
      res => {
        console.log(res);
        this._disabilityReportList = res.data;

      },
      err => {
        console.log(err);
      }
    );
  }
  public newDisabilityReport() {
    if (this.ikid==-1) {
      alert("Lütfen Önce İlk Kayıdı Kaydediniz..");
      this.engelliRaporlari.hide();
      return;
    }
    this._disabilityReport = new DisabilityReport();
    this._disabilityReport.engelligrubu=this.engelli.ikengelligrubu;
    this._disabilityReport_operation = DataOperations.create;
  }
  public saveDisabilityReport() {
    this._disabilityReport.rap_ikid = this.ikid;
    //this._disabilityReport.rapuserid = this.service.getUserId();
  if (this._disabilityReport == null) {
      alert("Lütfen Bilgileri Doldurun");
      return;
    }
    if (this._disabilityReport.id == null) {

      if (this._disabilityReportList.find(f => f.raporaktif == true))
        return alert("Aktif Rapor Kaydı Bulunmakta. Sadece 1 Tane Rapor Olabilir!");
      this._disabilityReport.raporaktif = true;
      this._disabilityReport.engelligrubu=this.engelli.ikengelligrubu;
      this.service.postWithPostModel<ResModel<DisabilityReport>, DisabilityReport>("insertDisabilityReport", this._disabilityReport, true).subscribe(
        res => {
          console.log(res);
          this._disabilityReport=res.data;
          this.getListDisabilityReportList();
        },
        err => {
          console.log(err);
        }
      );
    }
    else
      this.service.postWithPostModel<ResModel<DisabilityReport>, DisabilityReport>("saveDisabilityReport", this._disabilityReport, true).subscribe(
        res => {
          console.log(res);
          this.getListDisabilityReportList();
          this.engelliRaporlari.hide();
        },
        err => {
          console.log(err);
        }
      );
  }
  public disabilityReportSave() {
    this.saveDisabilityReport();
    //this._disabilityReport = new DisabilityReport();
  }
  public editDisabilityReport(report: DisabilityReport) {

    this._disabilityReport_operation = DataOperations.edit;
    this._disabilityReport = report;
    if (this._disabilityReport.raportarihi)
    this._disabilityReport.raportarihi = new Date(this._disabilityReport.raportarihi);
    if (this._disabilityReport.raporbitistar)
    this._disabilityReport.raporbitistar = new Date(this._disabilityReport.raporbitistar);
    //this.getPhoto_disabilityReport();
  }

  public closeDisabilityReport() {
    if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
      this.service.postWithPostModel<ResModel<DisabilityReport>, number>("closeDisabilityReport", this._disabilityReport.id, true).subscribe(
        res => {
          console.log(res);
          if (!res.isSuccess)
            return this.showAlert(NotificationTypes.error, "Hata", "Kayıt Kapatırken Bir Hata Oluştu.");

          this.showAlert(NotificationTypes.success, "Başarılı", "Başarı ile Kapatıldı.");
          this.getListDisabilityReportList();
        },
        err => {
          console.log(err);
        }
      );
  }

    public validate(evt)
    {
        if(evt.keyCode!=8)
        {
            let theEvent = evt || window.event;
            let key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
            console.log(key);
            let regex = /[0-9]|\./;
            if(key=="."){
              theEvent.returnValue = false;
    
                if (theEvent.preventDefault)
                    theEvent.preventDefault();
            }
            if (!regex.test(key))
            {
                theEvent.returnValue = false;
    
                if (theEvent.preventDefault)
                    theEvent.preventDefault();
                }
              
            }
        }
        private showAlert(type: NotificationTypes, title: string, body: string) {
          this.toasterService.popAsync(this.service.getToast(type, title, body));
        }
}
// Engelli Raporu
export class DisabilityReport {
  public id: number;
  public rap_ikid: number;
  public duzenleyenkurum: string;
  public engelligrubu;
  public raportarihi: Date;
  public raporno: string;
  public raporderecesi: number;
  public agirengelli: boolean;
  public teshis: string;
  public raporgecerlilikdurumu: string;
  public raporbitistar: Date;
  public raporaktif: boolean;
  public rapkapkayittar: Date;
  public rapuserid: number;
  public rapdatetime: Date;
  public updatedate: Date;
  public _reportimage: any;
  public ikbagimlideg:string;
  constructor() {
    this.raporbitistar = null;
    this.raportarihi = null;
    this.raporgecerlilikdurumu=null;
    this.teshis=null;
    this.ikbagimlideg=null;
  }
}
