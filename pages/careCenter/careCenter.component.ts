import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { City, County } from '../../models/CityCounty';
import { License } from '../../models/license';
import { CareCenter } from '../../models/careCenter';
import { PostModel } from '../../models/postModel';
import { ResModel } from '../../models/resModel';
import { ManagerInfoModel } from '../../models/ManagerInfoModel';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { DataOperations } from '../../enums/DataOperations.enum';
import 'style-loader!angular2-toaster/toaster.css';
import { ModalDirective } from '../../../../node_modules/ngx-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { text } from '@angular/core/src/render3/instructions';
import { BsLocaleService } from 'ngx-bootstrap';
import { asap } from 'rxjs/internal/scheduler/asap';
import { SixImageOperationComponent } from '../../components/sixImageOperation/sixImageOperation.component';
import { ImageOperationComponent } from '../../components/imageOperation/imageOperation.component';

@Component({
  selector: 'app-careCenter',
  templateUrl: './careCenter.component.html',
  styleUrls: ['./careCenter.component.css']
})
export class CareCenterComponent implements OnInit {
  @ViewChild('lisansModal') public lisansModal: ModalDirective;
  public BM: CareCenter = new CareCenter();
  public _photo: File;
  public _photoUrl = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  public _fzkselFotolar = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  public modal_image_url = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  // public bmKadinCount: number;
  // public bmErkekCount: number;
  // public bmPatientSum: number = this.bmKadinCount + this.bmErkekCount;
  public cityList_genel: City[];
  public cityList_ticari: City[];
  public countyList_genel: County[];
  public countyList_ticari: County[];
  public taxOfficeList: taxOffice[];
  public _license: License = new License();
  public _manager: ManagerInfoModel[] = new Array<ManagerInfoModel>();
  public bmKurMud = new ManagerInfoModel();
  public bmSorMud = new ManagerInfoModel();
  public islicensesShowAll: Boolean = false;
  public jeneratorSorg: string;
  public suSorg: string;
  public asansrSorg: string;
  closeResult: String;
  modalReference: any;
  public _operation: DataOperations;
  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public iban_mask = ['T', 'R', /[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/];
  public kira_mask = [/[1-9]/, /\d/, '0', '0', '0', 'T', 'L',];
  public getCareCenterPhotoUrl: string = ""
  isBlur=false;
  isPopup=false;
  //Asansör
  public _elevator: Asansor = new Asansor();
  public blocklist = ["A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"];
  @ViewChild('generalInfomodal') generalInfomodal: ModalDirective;
  @ViewChild('fzkAsansor') fzkAsansor: ModalDirective;
  @ViewChild('commercialInfomodal') commercialInfomodal: ModalDirective;
  @ViewChild('showSixPhoto') showSixPhoto_onPage: SixImageOperationComponent;
  @ViewChild('lisansPhoto') lisansPhoto: ImageOperationComponent;
  public id: number;
  public image_tick=0;
  constructor(private service: AppServiceService, private toasterService: ToasterService, private http: HttpClient, private localeService: BsLocaleService) {
    this.localeService.use('tr');
    this.id = this.service.getCareCenterId();
    this.refreshCareCenterPhoto();
  }

  ngOnInit() {
    // this.service.setCareCenterId(1);
    this.BM = new CareCenter();
    //this.bmPatientSum = this.bmKadinCount + this.bmErkekCount;
    this.cityList_genel = new Array<City>();
    this.cityList_ticari = new Array<City>();
    this.BM.ruhsat = new Array<License>();
    this.getCity();
    this.getBM();
    this.getManagersInfo();
    

  }
  openModal(s:boolean){
      this.isBlur=s;
  }
  openModalTwo(s:boolean){
    this.isPopup=s;
}
  refreshCareCenterPhoto() {
    this.getCareCenterPhotoUrl = this.service.getCareCenterPhotoURL();
    // document.querySelector<HTMLInputElement>("careCenterPhotoInput").nati
  }
  ngAfterViewInit() {

  }
  public cityOnChange_genel(cityname: string) {
    this.service.getCountyByName(cityname).subscribe(
      res => {
        this.countyList_genel = res.data;

      },
      err => {
        console.log(err);
      }
    );
  }
  public cityOnChange_ticari(cityname: string) {
    this.service.getCountyByName(cityname).subscribe(
      res => {
        this.countyList_ticari = res.data;
      },
      err => {
        console.log("Error occured");
      }
    );
    this.getTaxOffice(cityname);
  }
  public getTaxOffice(newObj: string) {
    this.taxOfficeList = [];
    this.service.getTaxOffice(newObj).subscribe(
      res => {
        console.log(res);
        this.taxOfficeList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public getCity() {
    this.cityList_genel = this.service.getCityList();
    this.cityList_ticari = this.service.getCityList();
  }
  public getBM() {
    if(this.isPopup==true)
      this.isBlur=true;
    
    // this._photo=null;
    //document.querySelector<HTMLInputElement>("careCenterPhotoInput").files=null;
    //this._photoUrl = this.service.defaultLoadingGif;
    // this.service.setCareCenterCode("1");
    this.service.postWithPostModel<ResModel<CareCenter>, string>("getCareCenter", null).subscribe(
      res => {
        console.log(res);
        if (!res.data) {
          this.showToast(NotificationTypes.error, "Bakım Merkezi Bilgileri Getirme İşlemi Başarısız ", " Bakım Merkezi Bilgileri getirilirken bir hata oluştu.");
          return;
        }
        this.BM = res.data;
        this.id = res.data.bmid;
        if(res.data.bm_binasahipdur=="Mülk" || this.BM.bm_binasahipdur=="Mülk"){
          this.BM.bm_aylikkiratut=null;
          this.BM.bm_kirasozbastar=null;
          this.BM.bm_kirasozbittar=null;
        }
        if (res.data.bm_jenerator == true || this.BM.bm_jenerator == true) {
          this.jeneratorSorg = "Var";
        }
        if (res.data.bm_jenerator == false || this.BM.bm_jenerator == false) {
          this.jeneratorSorg = "Yok";
          this.BM.bm_jeneratorguc=null;
        }
        if (res.data.bm_sudeposu == true || this.BM.bm_sudeposu == true) {
          this.suSorg = "Var";
        }
        if (res.data.bm_sudeposu == false || this.BM.bm_sudeposu == false) {
          this.suSorg = "Yok";
          this.BM.bm_sdkapasite=null;
        }
        if (res.data.bm_asansor == true || this.BM.bm_asansor == true) {
          this.asansrSorg = "Var";
        }
        if (res.data.bm_asansor == false || this.BM.bm_asansor == false) {
          this.asansrSorg = "Yok";
        }
        if (res.data.bmfoto)
          this._photoUrl = "data:image/png;base64," + res.data.bmfoto;
        if (this.BM.ruhsat == null)
          this.BM.ruhsat = new Array<License>();
        if (this.BM.bmil != null)
          this.cityOnChange_genel(this.BM.bmil);
        if (this.BM.bmticil != null) {
          this.cityOnChange_ticari(this.BM.bmticil);
        }

        if (res.data.bm_kirasozbastar)
          this.BM.bm_kirasozbastar = new Date(res.data.bm_kirasozbastar);
        if (res.data.bm_kirasozbittar)
          this.BM.bm_kirasozbittar = new Date(res.data.bm_kirasozbittar);

        this.getCareCenterLicenses();
        this.getAsansorList();
      },
      err => {
        this.showToast(NotificationTypes.error, "Bakım Merkezi Bilgileri Getirme İşlemi Başarısız ", " Bakım Merkezi Bilgileri getirilirken bir hata oluştu.");
        console.log(err);
      }
    );
  }
  public getManagersInfo() {


    this.service.postWithPostModel<ResModel<ManagerInfoModel[]>, number>("getAllEmployeeManager", this.service.getCareCenterId()).subscribe(
      res => {
        console.log("getAllEmployeeManager: -----------------------------------------------------------------");
        console.log(res);
        // this._manager = res.data;
        let manager: ManagerInfoModel = res.data.find(f => f.perkadro == "KURUCU MÜDÜR");
        if (manager != null) {
          this.bmKurMud = manager;
          if (!this.bmKurMud.perfoto)
            this.bmKurMud.perfoto = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
          else
            this.bmKurMud.perfoto = "data:image/png;base64," + manager.perfoto;

        }
        manager = res.data.find(f => f.perkadro == "SORUMLU MÜDÜR" || f.perkadro == "SORUMLU MÜDÜR + MESLEKİ PERSONEL");
        if (manager != null) {
          this.bmSorMud = manager;
          if (!this.bmSorMud.perfoto)
            this.bmSorMud.perfoto = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
          else
            this.bmSorMud.perfoto = "data:image/png;base64," + manager.perfoto;
        }
        // console.log("%c%s",
        //   "color: red; background: yellow; font-size: 24px;",
        //   "getManagersInfo()!");
        // console.log(res);
      },
      err => {
        console.log("Error!  getManagersInfo(): !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(err);
      });
  }
  public async saveCareCenter() {
    this.isBlur=false;
    if (this._photo)
      this.saveCareCenterPhoto(await this.service.getCareCenterId());

    let p: PostModel<CareCenter> = new PostModel("123");
    p.data = this.BM;
    this.service.post<ResModel<CareCenter>>("saveCareCenter", p, true).subscribe(
      res => {
        if (res.isSuccess)
          this.showToast(NotificationTypes.success, "Bakım Merkezi Güncellendi!", "Bakım Merkezi Başarı ile Güncellendi..");
        else
          this.showToast(NotificationTypes.error, "Bakım Merkezi Güncelleme İşlemi Başarısız ", " Bakım Merkezi Güncellenemedi");
        //this.BM = res.data;
        this.getBM();
        this.refreshCareCenterPhoto();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

  }

  public onFileSelected(event) {
    // console.log(event);
    this._photo = event.target.files[0];

    var reader = new FileReader();
    

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    // reader.onload = (event) => { // called once readAsDataURL is completed
    //   this.getCareCenterPhotoUrl = reader.result.toString();
    // }
    

  }

  // CareCenter License -------------------------------------------------------------------------------------------------------------------
  public saveLicense() {


    if (!this._license.bmegid) {
      //Create işlemi başarı ile gerçekleşirse listeye (tabloya) ekle
      // Değilse hata mesajı gönderilecek.
      this._license.bmegbmid = this.service.getCareCenterId();
      this.createLicense(this._license);
    }
    else {
      //update işlemi başarı ile gerçekleşirse listeye (tabloya) ekle
      // Değilse hata mesajı gönderilecek.
      this.updateLicense(this._license)
      this.lisansModal.hide();
    }

  }
  public closeLicense(l: License) {

    var r = confirm("Kaydı Silmek İstediğinize Emin misiniz?");
    if (r == true)
      this.service.postWithPostModel<ResModel<String>, number>("closeCareCenterGroup", l.bmegid).subscribe(
        res => {
          console.log(res);
          this.getCareCenterLicenses();
        },
        err => {
          console.log(err);
        }
      );
  }
  saveCareCenterPhoto(id) {
    console.log(id);
    if (!this._photo)
      return;
    const fd = new FormData();

    fd.append('foto', this._photo);
    fd.append('id', id.toString());
    this.service.post<any>("SaveCareCenterPhoto", fd, true).subscribe(
      res => {
        console.log(res);

        //this.getCareCenterPhotoUrl = this.service.getCareCenterPhotoURL();

      },
      err => { console.log(err); }
    );
  }

  createLicense(xlicense: License) {
    xlicense.bmegkapalikayit = false;debugger;
    if ((this._license.bmegkpsterkek + this._license.bmegkpstkadin) > 100)
      alert("Kapasite Toplamı Bir Engel Grubunda 100'ü Geçemez!");
    if ((this._license.bmegkpsterkek + this._license.bmegkpstkadin) <= 100)
      this.service.postWithPostModel<ResModel<number>, License>("insertCareCenterGrup", xlicense, true).subscribe(
        res => {
          if (!res.isSuccess) {
            console.log(res.message);
            alert("Hata: " + "Bir bakım merkezinde birden fazla aynı grup eklenemez. Lütfen önceki kaydı kapattıktan sonra yeni bir grup ekleyin!");
          }
          else {
            console.log("Kayıt işlemi Başarılı");
            console.log(res);
            this._license.bmegid=res.data;
            // this.savePhoto_acilisIzinBelgesi(res.data);
            this.addLicense();
          }
        },
        err => {
          console.log(err);
        }
      );
  }
  updateLicense(xlicense: License) {

    let _isSuccess: boolean = false;
    this.service.postWithPostModel<ResModel<License>, License>("saveCareCenterGrup", xlicense).subscribe(
      res => {
        if (!res.isSuccess)
          alert("Hata: " + "Bir bakım merkezinde birden fazla aynı grup eklenemez. Lütfen önceki kaydı kapattıktan sonra yeni bir grup ekleyin!");
        else {
          console.log("Güncelleme işlemi Başarılı");
          // this.savePhoto_acilisIzinBelgesi(res.data.bmegid);
       
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  public getCareCenterLicenses() {
    this.service.postWithPostModel<ResModel<License[]>, number>("getAllCareCenterGrup", this.service.getCareCenterId())
      .subscribe(
        res => {
          console.log(res);
          this.BM.ruhsat = res.data;
        },
        err => {
          console.log(err);
        }
      );
  }
  public addLicense() {
    if ((this._license.bmegkpsterkek + this._license.bmegkpstkadin) > 100) {

      alert("Kapasite Toplamı Bir Engel Grubunda 100'ü Geçemez!");
      return;
    }
    this.BM.ruhsat.push(this._license);

  }
  // \CareCenter License -------------------------------------------------------------------------------------------------------------------

  editLicense(l: License) {
    this._license = l;
    this._license.bmegonaytar = new Date(l.bmegonaytar);
   // this.lisansPhoto.id = l.bmegid.toString();
    //this.lisansPhoto.getPhotoWithPost(l.bmegid);
  }
  private showToast(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }


  //-----------Asansor------------------------------
  public getAsansorList() {
    // this.service.postWithPostModel<ResModel<Asansor[]>, number>("saveCareCenterGrup", xlicense).subscribe(
    //   res => {
    //    console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    // this.BM.bm_asansor_list = [];
    // this.BM.bm_asansor_list.push({ asansorNo: 1, asansorRenk: "Yeşil", asansorSonMuayeneTar: "11/12/2020", asansorKap: "4 Kişilik" });
    // this.BM.bm_asansor_list.push({ asansorNo: 2, asansorRenk: "Mavi", asansorSonMuayeneTar: "11/12/2020", asansorKap: "4 Kişilik" });
    // this.BM.bm_asansor_list.push({ asansorNo: 3, asansorRenk: "Kırmızı", asansorSonMuayeneTar: "11/12/2020", asansorKap: "4 Kişilik" });
    console.log(this.BM._bm_asansor);
  }
  public showElevator(e) {
    this._elevator = e;
    this.deleteAsansor();
    // this._elevator.asansorsonmuatar = new Date(e.asansorsonmuatar);
  }
  public saveElevator() {
    this._elevator.asansorbmid = this.service.getCareCenterId();
    if (this._elevator.id > 0)
      this.updateAsansor();
    else
      this.insertAsansor();

  }
  public cancelElevator() {
    this._elevator = new Asansor();
    this.getBM();
  }
  public getNumbers(): number[] {
    let n: number[] = [];
    for (let index = 1; index < 51; index++) {
      n.push(index);

    }
    return n;
  }
  public asansrG() {
    this._elevator = new Asansor();
  }
  public insertAsansor() {
    //insertElevator
    if(this._elevator.asansorblok!=null){
    this.service.postWithPostModel<ResModel<Asansor>, Asansor>("insertElevator", this._elevator).subscribe(
      res => {
        console.log(res);
        this.getBM();
      },
      err => {
        console.log(err);
      }
    );
  }
  else
  alert("Asansör Blok Adını Seçmeden kayıt Yapamazsınız.");
  }
  public updateAsansor() {
    this.service.postWithPostModel<ResModel<Asansor>, Asansor>("updateElevator", this._elevator).subscribe(
      res => {
        console.log(res);
        this.getBM();
      },
      err => {
        console.log(err);
      }
    );
  }
  public deleteAsansor() {
    if (confirm("Kaydı Silmek İstediğinize Emin misiniz?")) {
      this.service.postWithPostModel<ResModel<string>, Asansor>("deleteElevator", this._elevator).subscribe(
        res => {
          console.log(res);
          this.getBM();
        },
        err => {
          console.log(err);
        }
      );
    }
    
  }

  async removeLogo() {
    this._photo = null;
    console.log("removeLogo()")
    this.service.postWithPostModel<String, Number>("deleteCareCenterImage", this.service.getCareCenterId(), true)
      .subscribe(
        res => {
          this.refreshCareCenterPhoto();
          console.log(res);
          //this.getCareCenterPhoto();
        },
        err => { console.log(err); });
  }
  public sixPhotoRefreshed() {
    console.log("refreshed");
    this.showSixPhoto_onPage.refresh();
  }
  public newLisans(){
    this._license=new License();
    this.lisansPhoto.clearAll();
    //this.lisansPhoto.photoSrc="";
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
}

export class taxOffice {

  public vdadi: string;
  public vdid: number;

}
export class Asansor {

  public id: number;
  public asansorblok: string;
  public asansorno: number;
  public asansorrenk: string;
  public asansorkap: string;
  public asansorsonmuatar: Date;
  public asansorbmid: number;
}
export class Photo {
  public id: number;
  public foto_bmid: number;
  public bm_foto: string;

}
