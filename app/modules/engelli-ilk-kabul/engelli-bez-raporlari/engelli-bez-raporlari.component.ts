import { Component, OnInit, ViewChild } from '@angular/core';
import { DataOperations } from '../../../enums/DataOperations.enum';
import { Disabled } from '../../../models/Disabled';
import { AppServiceService } from '../../../services/appService.service';
import { ToasterService } from 'angular2-toaster';
import { BsLocaleService, ModalDirective } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ResModel } from '../../../models/resModel';
import { NotificationTypes } from '../../../enums/notificationTypes.enum';
import { ImageOperationComponent } from '../../../components/imageOperation/imageOperation.component';


@Component({
  selector: 'app-engelli-bez-raporlari',
  templateUrl: './engelli-bez-raporlari.component.html',
  styleUrls: ['./engelli-bez-raporlari.component.scss']
})
export class EngelliBezRaporlariComponent implements OnInit {
  @ViewChild('engelliBez') public engelliBez: ModalDirective;
  @ViewChild('bezPhoto') bezPhoto: ImageOperationComponent;
  public engelli: Disabled;

  public _disabilityClothList: DisabilityCloth[] = [];
  public _disabilityCloth: DisabilityCloth = new DisabilityCloth();// Engelli Bez Raporu
  public _disabilityCloth_operation: DataOperations;
  public _photoClothReport: File;
  public ikid:number=-1;


  constructor(private service: AppServiceService, private route: ActivatedRoute,
    private router: Router, private toasterService: ToasterService, private localeService: BsLocaleService) { 
    this.engelli = new Disabled();
    this.localeService.use('tr');
  }

  ngOnInit() {
  }
/*------------- ENGELLİ BEZ RAPORU EKLEME------------------- */
newDiaperReport() {
  if (this.ikid==-1) {
    alert("Lütfen Önce İlk Kayıdı Kaydediniz..");
    this.engelliBez.hide();
    return;
  }
  else {
    this._disabilityCloth = new DisabilityCloth();
    this._disabilityCloth_operation = DataOperations.create;
  }
}
public getListDisabilityClothReport() {
  console.log("getListDisabilityClothReport");
  this.service.postWithPostModel<ResModel<DisabilityCloth[]>, number>("getListDisabilityClothReport", this.ikid).subscribe(
    res => {
      console.log(res);
      this._disabilityClothList = res.data;
    },
    err => {
      console.log(err);
    }
  );
}

public insertDisabilityClothReport() {
  this._disabilityCloth.engelliid = this.ikid;
  if (this._disabilityCloth.id == null) {
    if (this._disabilityClothList.find(f => f.raporaktif == true))
      return alert("Aktif Bez Kaydı Bulunmakta. Aktif Sadece 1 Tane Vasi Olabilir!");
    this._disabilityCloth.raporaktif = true;
    this.service.postWithPostModel<ResModel<DisabilityCloth>, DisabilityCloth>("insertDisabilityClothReport", this._disabilityCloth, true).subscribe(
      res => {
        console.log(res);
        //this.savePhoto_clothReport(res.data);
        this._disabilityCloth=res.data;
        this.getListDisabilityClothReport();
      },
      err => {
        console.log(err);
      }
    );
  }
}
public updateDisabilityCloth() {
  this.service.postWithPostModel<ResModel<DisabilityCloth>, DisabilityCloth>("updateDisabilityClothReport", this._disabilityCloth, true).subscribe(
    res => {
      console.log(res);
      this.getListDisabilityClothReport();
    },
    err => {
      console.log(err);
    }
  );
}
ver() {
  if (this._disabilityCloth.gunlukkullanimadedi == 1) {
    this._disabilityCloth.aylikkullanimadedi = 30;
  }

  if (this._disabilityCloth.gunlukkullanimadedi == 2) {
    this._disabilityCloth.aylikkullanimadedi = 60;
  }

  if (this._disabilityCloth.gunlukkullanimadedi == 3) {
    this._disabilityCloth.aylikkullanimadedi = 90;
  }

  if (this._disabilityCloth.gunlukkullanimadedi == 4) {
    this._disabilityCloth.aylikkullanimadedi = 120;
  }
}
public closeDisabilityClothReport() {
  if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
    this.service.postWithPostModel<ResModel<DisabilityCloth>, DisabilityCloth>("closeDisabilityClothReport", this._disabilityCloth, true).subscribe(
      res => {
        console.log(res);
        this.getListDisabilityClothReport();
      },
      err => {
        console.log(err);
      }
    );
}

public addCloth() {
  if (this._disabilityCloth.id > 0){
    this.updateDisabilityCloth();
    this.engelliBez.hide();
  }
  else
    this.insertDisabilityClothReport();
}
public closeCloth() {
  if (this._disabilityCloth.id > 0) {
    this.closeDisabilityClothReport();
  }
}
public editClothReport(cloth: DisabilityCloth) {
  this._disabilityCloth = cloth;
  if(this._disabilityCloth.raportarihi)
  this._disabilityCloth.raportarihi = new Date(this._disabilityCloth.raportarihi);
  if(this._disabilityCloth.raporgecerliliktarihi)
  this._disabilityCloth.raporgecerliliktarihi = new Date(this._disabilityCloth.raporgecerliliktarihi);
}

//Rakam sınırlama
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
//Engelli Bez Raporu
export class DisabilityCloth {
  public id: number;
  public bmId: number;
  public engelliid: number;
  public duzenleyenkurum: string;
  public raportarihi: Date;
  public raporno: number;
  public raporgecerlilikdurumu: string;
  public raporgecerliliktarihi: Date;
  public tani: string;
  public raporaktif: boolean;
  public gunlukkullanimadedi: number;
  public aylikkullanimadedi: number;
  public createdate: Date;
  public updatedate: Date;
  public createuserid: number;
  public _reportimage: any;
  constructor(){
    this.raporgecerlilikdurumu=null;
    this.gunlukkullanimadedi=null;
  }
}
