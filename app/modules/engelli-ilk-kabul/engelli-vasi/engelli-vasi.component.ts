import { Component, OnInit, ViewChild } from '@angular/core';
import { Disabled } from '../../../models/Disabled';
import { AppServiceService } from '../../../services/appService.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { BsLocaleService, ModalDirective } from 'ngx-bootstrap';
import { Vasi } from '../../../pages/firstAcceptance/Vasi';
import { ResModel } from '../../../models/resModel';
import { County, City } from '../../../models/CityCounty';
import { DataOperations } from '../../../enums/DataOperations.enum';
import { ImageOperationComponent } from '../../../components/imageOperation/imageOperation.component';
@Component({
  selector: 'app-engelli-vasi',
  templateUrl: './engelli-vasi.component.html',
  styleUrls: ['./engelli-vasi.component.scss']
})
export class EngelliVasiComponent implements OnInit {
  @ViewChild('engelliVasi') public engelliVasi: ModalDirective;
  @ViewChild('engelVasi') lisansVasi: ImageOperationComponent;

  public engelli: Disabled;
  public _vasiOperation:DataOperations;

  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public tc_mask=[/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/];

  public cityList: City[];
  public countyList: County[];
  public _countyList_vasi: County[] = [];
  public _vasiList: Vasi[] = [];
  public _vasi: Vasi = new Vasi();   // Vasi Raporu   
  
  public _photoVasi: File;
  public ikid:number=-1;
  
  constructor(private service: AppServiceService, private route: ActivatedRoute,
    private router: Router, private toasterService: ToasterService, private localeService: BsLocaleService) {
    this.engelli = new Disabled();
    this.localeService.use('tr');
    console.info(this.ikid);
   }

  ngOnInit() {
    this.getCity();
    this._vasi = new Vasi();
    this._vasi.image = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';
  }

  public getVasiList() {
    console.log("getVasi "+"ikid: " + this.ikid);
    this.service.postWithPostModel<ResModel<Vasi[]>, number>("getAllVasi", this.ikid).subscribe(
      res => {
        console.log(res);
        
        this._vasiList = res.data;
        
      },
      err => {
        console.log(err);
      }
    );
  }
  public newVasi() {
    if (this.ikid==-1) {
      alert("Lütfen Önce İlk Kayıdı Kaydediniz..");
      this.engelliVasi.hide();
      return;
    }
    this._vasi = new Vasi();
    this._vasiOperation = DataOperations.create;
  }
  public addVasi() {
    this.saveVasi();
    
  }
  public cancelVasi() {
    this._vasi = new Vasi();
  }
 
  public editVasi(vasi: Vasi) {
    //this._vasi=new Vasi();
    this._vasi = vasi;
    if (this._vasi.karartarihi)
          this._vasi.karartarihi = new Date(this._vasi.karartarihi);
    if (this._vasi.gecerliliktarihi)
          this._vasi.gecerliliktarihi = new Date(this._vasi.gecerliliktarihi);
    
    this.CityonChange_vasi(this._vasi.vasiil);
   // this.getPhoto_vasi();
  }
  public CityonChange_vasi(name: string) {
    this.countyList = [];
    this.service.getCounty(this.service.getCityCode(name)).subscribe(
      res => {
        this._countyList_vasi = res.data;
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  public getCity() {
    this.cityList = this.service.getCityList();
  }
  public saveVasi() {
    this._vasi.vasi_ikid = this.ikid;
    if (this._vasi == null) {
      alert("Lütfen Bilgileri Doldurun");
      return;
    }
    const tc=this.service.deleteUderline(this._vasi.vasitc);
    if (tc=="" || tc.length < 11) {
      alert("Lütfen Vasi TC Kimlik Numarasını 11 Karakter Olacak Şekilde Doldurun!");
      return;
    }
    if (this._vasi.id == null) {
      if (this._vasiList.find(f => f.aktif == true))
        return alert("Aktif Vasi Kaydı Bulunmakta. Aktif Sadece 1 Tane Vasi Olabilir!");
      this.service.postWithPostModel<ResModel<Vasi>, Vasi>("insertVasi", this._vasi, true).subscribe(
        res => {
          console.log(res);
          //this.savePhoto_vasi(res.data.id);
          this._vasi=res.data;
          this.getVasiList();
        },
        err => {
          console.log(err);
        }
      );
    }
    else
      this.service.postWithPostModel<ResModel<Vasi>, Vasi>("updateVasi", this._vasi, true).subscribe(
        res => {
          console.log(res);
         // this.savePhoto_vasi(res.data.id);
          this.getVasiList();
          this.engelliVasi.hide();

        },
        err => {
          console.log(err);
        }
      );
      this._vasi = new Vasi();
  }
  public closeVasi() {
    if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
      this.service.postWithPostModel<ResModel<string>, number>("closeVasi", this._vasi.id, true).subscribe(
        res => {
          this.getVasiList();

          this._vasi = new Vasi();
          this._vasi.image = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';
        },
        err => {
          console.log(err);
        }
      );
  }
    // Vasi Foto Seçme
    // public onFileSelected_vasi(event) {
    //   if (event.target.files && event.target.files[0]) {
    //     this._photoVasi = event.target.files[0];
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = (event) => {
    //       this._vasi.image = reader.result.toString();
    //     }
    //   }
    // }
     // Vasi resmi kaydetme
  // savePhoto_vasi(id) {
  //   if (!this._photoVasi)
  //     return;
  //   const fd = new FormData();
  //   fd.append('foto', this._photoVasi);
  //   fd.append("id", id.toString());

  //   this.service.post<any>("vasiPhotoInsert", fd, true).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  // getPhoto_vasi() {
  //   this.service.getPhoto("getPhotoVasi", this._vasi.id).subscribe(
  //     res => {
  //       console.log(res);

  //       this._vasi.image = "data:image/png;base64," + res.data;
  //     },
  //     err => { console.log(err); }
  //   );
  // }
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
