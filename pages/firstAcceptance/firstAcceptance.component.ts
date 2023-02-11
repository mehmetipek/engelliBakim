import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { City, County } from '../../models/CityCounty';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ResModel } from '../../models/resModel';
import { DataOperations } from '../../enums/DataOperations.enum';
import { Disabled } from '../../models/Disabled';
import { Router, ActivatedRoute } from '@angular/router';
import { Vasi } from './Vasi';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { ToasterService } from 'angular2-toaster';
import { BsLocaleService, BsModalRef, ModalDirective } from 'ngx-bootstrap';
import { id } from '@swimlane/ngx-charts/release/utils';
import { EngelliIlacRaporComponent } from '../../modules/engelli-ilk-kabul/engelli-Ilac-Rapor/engelli-Ilac-Rapor.component';
import { EngelliMamaRaporComponent } from '../../modules/engelli-ilk-kabul/engelli-mama-rapor/engelli-mama-rapor.component';
import { EngelliVasiComponent } from '../../modules/engelli-ilk-kabul/engelli-vasi/engelli-vasi.component';
import { EngelliRaporlariComponent, DisabilityReport } from '../../modules/engelli-ilk-kabul/engelli-raporlari/engelli-raporlari.component';
import { EngelliBezRaporlariComponent } from '../../modules/engelli-ilk-kabul/engelli-bez-raporlari/engelli-bez-raporlari.component';
import { ImageOperationComponent } from '../../components/imageOperation/imageOperation.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-firstAcceptance',
  templateUrl: './firstAcceptance.component.html',
  styleUrls: ['./firstAcceptance.component.css'],

})
export class FirstAcceptanceComponent implements OnInit {
  @ViewChild('ilacRaporu') mReport: EngelliIlacRaporComponent;
  @ViewChild('mamaRapor') mamaRapor: EngelliMamaRaporComponent;
  @ViewChild('engelVasi') vasiReport: EngelliVasiComponent;
  @ViewChild('engelRapor') engelliReports: EngelliRaporlariComponent;
  @ViewChild('engelBez') engelliBez: EngelliBezRaporlariComponent;
  @ViewChild('lisansFirst') lisansFirst: ImageOperationComponent;
  @ViewChild('generalInfomodal') public generalInfomodal: ModalDirective;
  @ViewChild('edit') editModal: ModalComponent;

  public engelli: Disabled;

  public cityList: City[];

  public countyList: County[];
  public _countyList_vasi: County[] = [];

  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public tc_mask = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public isEditFormSubmit: boolean = false;
  // DataOperations -------------------------------------------------------------------------
  // İşlemin create mi yoksa update mi olduğunu öğrenmek için kullandığımız değişkenler..
  public operation: DataOperations;
  public disabilityImageUrl:string="";

  // public url = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';
  isBlur=false;

  // Fotolar---------------------------------------------------------------------------------
  //public _photo: File;
  

  constructor(private service: AppServiceService, private route: ActivatedRoute,
    private router: Router, private toasterService: ToasterService, private localeService: BsLocaleService) {
    this.engelli = new Disabled();
    this.localeService.use('tr');
  }

  ngOnInit() {
    this.getCity();
    this.operation = DataOperations.create;
    console.log(this.service.getCareCenterCode());
    this.getFirst();
  }
  openModal(s:boolean){
    this.isBlur=s;
}
  getFirst() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'] || 0;
      if (id != 0) {
        this.engelli.ikid = id;
        this.getFirstAcceptance();
      }
      else {
        this.engelli = new Disabled();
        this.vasiReport.engelli=this.engelli;
        this.vasiReport.ikid=-1;
        this.vasiReport._vasiList=[];
        // Engelli Raporu
        this.engelliReports.engelli=this.engelli;
        this.engelliReports.ikid=-1;
        this.engelliReports._disabilityReportList=[];
        // engelli ilaç raporu
        this.mReport.ikid=-1;
        this.mReport._medicamentReportList=[];
        // engelli bez raporu
        this.engelliBez.engelli=this.engelli;
        this.engelliBez.ikid=-1;
        this.engelliBez._disabilityClothList=[];
        //Engelli mama raporu
        this.mamaRapor.ikid=-1;
        this.mamaRapor._disabilityFoodList=[];
        this.disabilityImageUrl=this.service.defaultImage;
      }

    });
  }
  public cancelFirst() {
    var r=confirm("Vazgeçmek İstediğinizden Emin misiniz?");
    if(!r)
    return;
    this.engelli = new Disabled();
    this.editModal.hide();
    this.getFirst();
    //this.engelli.ikfoto = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';
  }
  public getCity() {
    this.cityList = this.service.getCityList();
  }
  public CityonChange_ikametgah(name: string) {
    this.countyList = [];
    this.service.getCounty(this.service.getCityCode(name)).subscribe(
      res => {
        this.countyList = res.data;
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  // FirstAcceptance --------------------------------------------------------------
  public getFirstAcceptance() {
    console.log("getFirstAcceptance");

    this.service.postWithPostModel<ResModel<Disabled[]>, number>("getFirstAcceptance", this.engelli.ikid).subscribe(
      res => {
        if (!res.data[0])
          return this.showAlert(NotificationTypes.error, "Engelli Bulunamadı", "Engelli getirilirken bir hata oluştu!");
        console.log(res);
        this.engelli = res.data[0];
        if (res.data[0].ikdogtar)
          this.engelli.ikdogtar = new Date(res.data[0].ikdogtar);
        if (res.data[0].ikaspimonaytar)
          this.engelli.ikaspimonaytar = new Date(res.data[0].ikaspimonaytar);
        if (res.data[0].ikkabultarihi)
          this.engelli.ikkabultarihi = new Date(res.data[0].ikkabultarihi);
        if (res.data[0].ikayrilistar)
          this.engelli.ikayrilistar = new Date(res.data[0].ikayrilistar);
        if (res.data[0].ikaspimonayiptaltar)
          this.engelli.ikaspimonayiptaltar = new Date(res.data[0].ikaspimonayiptaltar);
        this.operation = DataOperations.edit;
        //this.getPhoto();
        this.disabilityImageUrl=this.service.getDisablityPhotoURL(this.engelli.ikid);


        this.CityonChange_ikametgah(this.engelli.ikadril);
        // Vasi Listesi Getirme
        this.vasiReport.ikid = this.engelli.ikid;
        this.vasiReport.getVasiList();
        //Engelli Rapor Listesi
        this.engelliReports.ikid = this.engelli.ikid;
        this.engelliReports.engelli.ikengelligrubu = this.engelli.ikengelligrubu;
        console.log("Engel Grubu:" + this.engelli.ikengelligrubu)
        this.engelliReports.getListDisabilityReportList();
        //Engelli İlaç Rapor Listesi Getirme
        this.mReport.getList(this.engelli.ikid);
        //Engelli Bez Raporu
        this.engelliBez.ikid = this.engelli.ikid;
        this.engelliBez.getListDisabilityClothReport();
        //Mama Raporu Listesi Getirme
        this.mamaRapor.ikid = this.engelli.ikid;
        this.mamaRapor.getListFoodReport();
      },
      err => {
        console.log(err);
      }
    );
  }
  public getDisablety_only_info() {
    console.log("getFirstAcceptance");

    this.service.postWithPostModel<ResModel<Disabled[]>, number>("getFirstAcceptance", this.engelli.ikid).subscribe(
      res => {
        if (!res.data[0])
          return this.showAlert(NotificationTypes.error, "Engelli Bulunamadı", "Engelli getirilirken bir hata oluştu!");

        console.log(res);

        this.engelli = res.data[0];
        if (res.data[0].ikdogtar)
          this.engelli.ikdogtar = new Date(res.data[0].ikdogtar);
        if (res.data[0].ikaspimonaytar)
          this.engelli.ikaspimonaytar = new Date(res.data[0].ikaspimonaytar);
        if (res.data[0].ikkabultarihi)
          this.engelli.ikkabultarihi = new Date(res.data[0].ikkabultarihi);
        if (res.data[0].ikayrilistar)
          this.engelli.ikayrilistar = new Date(res.data[0].ikayrilistar);
        if (res.data[0].ikaspimonayiptaltar)
          this.engelli.ikaspimonayiptaltar = new Date(res.data[0].ikaspimonayiptaltar);
        this.operation = DataOperations.edit;

        this.CityonChange_ikametgah(this.engelli.ikadril);


      },
      err => {
        console.log(err);
      }
    );
  }
  validateForm() {
    let isvalidate = false;
    // tc kontrol
    isvalidate = (this.engelli.iktcno ? this.service.deleteUderline(this.engelli.iktcno).length == 11 : false);
    // engelli adı
    
    isvalidate = isvalidate && (this.engelli.ikadi ? (this.engelli.ikadi.length > 0) : false);
    // cinsiyet
    isvalidate = isvalidate && (this.engelli.ikcinsiyet) && !(this.engelli.ikcinsiyet == "null");
    // Engel Grubu
    isvalidate = isvalidate && this.engelli.ikengelligrubu && !(this.engelli.ikengelligrubu == "null");
    
    if (!isvalidate) {
      this.showAlert(NotificationTypes.error,"Boş Alanları Doldurun","Lütfen Girilmesi Zorunlu Alanları Doldurunuz! (TC,Adı,Cinsiyet,Engel Grubu)")
      return false;
    }
    else
      return isvalidate;






  }
  public saveFirstAcceptance() {
    console.log("saveFirstAcceptance");
    if (!this.validateForm()) {
      console.log("invalid");
      this.isEditFormSubmit = true;
      return;
    }


    this.engelli.ikbmid = this.service.getCareCenterId();
    this.engelli.ikuserid = this.service.getUserId();
    this.engelli.ikfoto = null;
    if (!this.engelli.ikid)
      this.service.postWithPostModel<ResModel<Disabled>, Disabled>("insertFirstAcceptance", this.engelli, true).subscribe(
        res => {
          console.log(res);
          if (!res.isSuccess)
            return this.showAlert(NotificationTypes.error, "Hata", "İlk Kabul İşlemi Kaydedilirken Bir Hata Oluştu.");

          this.showAlert(NotificationTypes.success, "Başarılı", "İlk Kabul İşlemi Başarı ile Kaydedildi.");

          this.engelli = res.data;
          //this.savePhoto();
          this.operation = DataOperations.edit;
          this.getFirstAcceptance();
        },
        err => {
          console.log(err);
        }
      );
    else
      this.service.postWithPostModel<ResModel<Disabled>, Disabled>("saveFirstAcceptance", this.engelli, true).subscribe(
        res => {
          console.log(res);
          if (!res.isSuccess)
            return this.showAlert(NotificationTypes.error, "Hata", "İlk Kabul İşlemi Kaydedilirken Bir Hata Oluştu.");

          this.showAlert(NotificationTypes.success, "Başarılı", "İlk Kabul İşlemi Başarı ile Güncellendi.");
          //this.savePhoto();
          console.log(res);
          this.operation = DataOperations.edit;
          this.editModal.hide();
          this.getFirstAcceptance();
        },
        err => {
          console.log(err);
        }
      );
  }
  public newFirstAcceptance() {
    this.operation = DataOperations.create;
    this.engelli = new Disabled();
  }
  //Engelli Kayıt Kapatma
  public exitFirstAcceptences() {
    if (this.engelli.ikayrilistar != null) {
      if (confirm("Engelliyi Çıkarmak İstediğinize Emin misiniz?"))
        this.service.postWithPostModel<ResModel<Disabled>, Disabled>("exitFirstAcceptence", this.engelli, true).subscribe(
          res => {
            console.log(res);
            if (!res.isSuccess) {
              this.engelli.ikayrilistar = null;
              this.engelli.ikayrilisneden = null;
              this.engelli.ikgittigiyer = null;
              this.engelli.ikaspimonayiptaltar = null;
              this.engelli.ikaspimonayiptalno = null;
              this.engelli.ikaciklamalar = null;
              return this.showAlert(NotificationTypes.error, "Hata", "Kayıt Kapatırken Bir Hata Oluştu.");
            }
            this.showAlert(NotificationTypes.success, "Başarılı", "İlk Kabul İşlemi Başarı ile Ayrılışı Yapıldı.");
          },
          err => {
            console.log(err);
          }
        );
    }
    else {
      this.showAlert(NotificationTypes.warning, "Uyarı", "Lütfen ayrılış tarihini belirlendikten sonra işleme devam ediniz.");
      this.engelli.ikayrilisneden = null;
      this.engelli.ikgittigiyer = null;
      this.engelli.ikaspimonayiptaltar = null;
      this.engelli.ikaspimonayiptalno = null;
      this.engelli.ikaciklamalar = null;
    }
  }

  private showAlert(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }

  disabilityExitCancel() {
    this.getDisablety_only_info();
  }
  //Rakam sınırlama
  public validate(evt) {
    if (evt.keyCode != 8) {
      let theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      console.log(key);
      let regex = /[0-9]|\./;
      if (key == ".") {
        theEvent.returnValue = false;

        if (theEvent.preventDefault)
          theEvent.preventDefault();
      }
      if (!regex.test(key)) {
        theEvent.returnValue = false;

        if (theEvent.preventDefault)
          theEvent.preventDefault();
      }

    }
  }

}
export class DisabledViewModel {
  public disabled: Disabled;
  public vasiList: Vasi[];
  public disabilityReport: DisabilityReport;

}
