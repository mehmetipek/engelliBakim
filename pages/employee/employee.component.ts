import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { City, County } from '../../models/CityCounty';
import { AppServiceService } from '../../services/appService.service';
import { Phone } from '../../models/phone';
import { Employee } from '../../models/Employee';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ResModel } from '../../models/resModel';
import { Experience } from '../../models/Experience';
import { EmployeeViewModel } from '../../models/EmployeeViewModel';
import { DataOperations } from '../../enums/DataOperations.enum';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { BsLocaleService, ModalDirective } from 'ngx-bootstrap';
import { OperationType } from '../../models/OperationType.enum';
import { trLocale } from 'ngx-bootstrap/locale';
import { Tree } from '@angular/router/src/utils/tree';
import { ImageOperationComponent } from '../../components/imageOperation/imageOperation.component';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public mudurPersonel: Employee = new Employee();
  @ViewChild('lisansEmploye') lisansEmploye: ImageOperationComponent;
  public cityList_kisisel: City[];
  public cityList_iletisim: City[];
  public countyList_kisisel: County[];
  public countyList_iletisim: County[];
  public alankod;
  public _phone: Phone = new Phone("", "");
  public persons: Employee[];
  @ViewChild('editModal') editModal:ModalComponent;
  //Profil Fotosu
  //public photoUrl: string = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";

  showDropDown: boolean = false;
  showSurnameDropDown: boolean = false;
  public _operation: DataOperations;
  // ForModal
  closeResult: String;
  public mask = ['0', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public tc_mask=[/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/];
  public _photo: File;
  public experience: Experience = new Experience();
  public _jobs = [
    "Sosyal Hizmet Uzman?? (SHU)",
    "Psikolojik Dan????manl??k ve Rehberlik (PDR)",
    "Psikolog",
    "Fizyoterapist",
    "ATT",
    "Hem??ire",
    "Hasta Ya??l?? Bak??m",
    "A??????",
    "Di??er"
  ];
  public _licenses = [
    "Yok",
    "M",
    "A1",
    "A2",
    "A",
    "B1",
    "B",
    "BE",
    "C1",
    "C1E",
    "C",
    "CE",
    "D1",
    "D1E",
    "D",
    "DE",
    "F",
    "G"
  ];

  @ViewChild('generalInfomodal') generalInfomodal: ModalDirective;
  @ViewChild('contactInfomodal') contactInfomodal: ModalDirective;
  @ViewChild('educationStaffInfomodal') educationStaffInfomodal: ModalDirective;

  public employeeImage:string="";
  constructor(private service: AppServiceService, private modalService: NgbModal, private toasterService: ToasterService, private route: ActivatedRoute,
    private router: Router, private localeService: BsLocaleService) {
    this.localeService.use('tr');
  }
  ngOnInit() {
    this._operation = DataOperations.create;
    this.mudurPersonel.perTecrube = [];
    this.getCity();
    this.getEmployee();
  }
  getEmployee() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'] || 0;
      if (id != 0) {
       this.mudurPersonel.perid = id;
        this.searchByTC();
      }
      else{
        this.mudurPersonel=new Employee();
        
        this.mudurPersonel.perTecrube=[];
        this.employeeImage=this.service.defaultImage;
      }
    });
  }
  public addexperience() {
    console.log("addExperience()")
    // if (this.mudurPersonel.perTecrube.length > 4) {
    //   this.showAlert(NotificationTypes.error, "4 den Fazla Tecr??be Ekleyemezsiniz..", "Bir Personelin en fazla 4 adet deneyimini ekliyebilirsiniz...");
    //   return;
    // }
    if (!this.mudurPersonel.perTecrube)
      this.mudurPersonel.perTecrube = [];
    this.experience._modify = OperationType.added;
    this.mudurPersonel.perTecrube.push(this.experience);
  }
  //Yetenekler
  public deleteExperience(ex: Experience) {
    console.log(ex);
    if (confirm("Kayd?? Silmek ??stedi??inize Emin misiniz?")){
      ex._modify = OperationType.deleted;
      this.saveEmployee();
    }
  }
  //Rakam s??n??rlama
  public validate(evt)
  {
      if(evt.keyCode!=8)
      {
          let theEvent = evt || window.event;
          let key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
          if(key=="."){
            theEvent.returnValue = false;
  
              if (theEvent.preventDefault)
                  theEvent.preventDefault();
          }
          let regex = /[0-9]|\./;
          if (!regex.test(key))
          {
              theEvent.returnValue = false;
  
              if (theEvent.preventDefault)
                  theEvent.preventDefault();
              }
          }
      }
  public cityOnChange_kisisel(cityname: string) {

    this.service.getCountyByName(cityname).subscribe(
      res => {
        this.countyList_kisisel = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public cityOnChange_iletisim(cityname: string) {
    this.service.getCountyByName(cityname).subscribe(
      res => {
        this.countyList_iletisim = res.data;

      },
      err => {
        console.log(err);
      }
    );
  }
  public getCity() {
    this.service.getCity().subscribe(
      res => {
        this.cityList_kisisel = res.data;
        this.cityList_iletisim = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public isMale(): boolean {
    if (this.mudurPersonel.percinsiyet == "Erkek")
      return true;
    return false;
  }
  public isDone(): boolean {
    if (this.mudurPersonel.peraskerdurum == "Tecilli")
      return true;
    return false;
  }
//Tecr??beler
public newExperience(){
  this.addexperience();
  this.saveEmployee();
}
public experienceNull(){
this.experience = new Experience();
}
//
public searchByTC() {
    if (this.mudurPersonel.perid> 0)
      this.service.postWithPostModel<ResModel<EmployeeViewModel>, number>("getEmployee", this.mudurPersonel.perid, true).subscribe(
        res => {
          console.log(res);
          if (!res.isSuccess)
            return this.showAlert(NotificationTypes.error, "Kay??t Bulunamad??", "Kay??tl??  personel bulunmamaktad??r.!");
          if (!res.data.employee) {
            this.showAlert(NotificationTypes.error, "Kay??t Bulunamad??", "Kay??tl?? personel bulunmamaktad??r!");
            return;
          }
          else {
            this.mudurPersonel = res.data.employee;
            if(res.data.employee.perdogtar)
              this.mudurPersonel.perdogtar = new Date(res.data.employee.perdogtar);
            if(res.data.employee.pergiristar)
              this.mudurPersonel.pergiristar = new Date(res.data.employee.pergiristar); 
            if(res.data.employee.pergiraspimonaytar)
              this.mudurPersonel.pergiraspimonaytar = new Date(res.data.employee.pergiraspimonaytar);
            if(res.data.employee.perasteciltar)
              this.mudurPersonel.perasteciltar = new Date(res.data.employee.perasteciltar);
            if(res.data.ability)
              this.mudurPersonel.perTecrube = res.data.ability;
            if(res.data.employee.percikaspimonaytar)
              this.mudurPersonel.percikaspimonaytar=new Date(res.data.employee.percikaspimonaytar);
            if(res.data.employee.percikistar)
              this.mudurPersonel.percikistar=new Date(res.data.employee.percikistar);
            //this.photoUrl=this.lisansEmploye.photoSrc;            
            //this.getPhoto();
            this.employeeImage=this.service.getEmployeePhotoURL(this.mudurPersonel.perid);
            this.cityOnChange_kisisel(this.mudurPersonel.perdogyeril);
            this.cityOnChange_iletisim(this.mudurPersonel.peradril);
           this.mudurPersonel.perTecrube=res.data.ability;
            //G??ncelleme i??lemi oldu??unu belirtiyoruz.
            if(this._operation = DataOperations.edit)
            this.showAlert(NotificationTypes.success, "Ba??ar??l??", "Personel Ba??ar?? ile Geldi");
          }
        },
        err => {
          console.log("Kullan??c?? ??ekilirken hata olu??tu");
        }
      );
  }
  public saveEmployee() {
    let data: EmployeeViewModel = new EmployeeViewModel();
    this.mudurPersonel.perbmid = this.service.getCareCenterId();
    this.mudurPersonel.perfoto=null;
    data.employee = this.mudurPersonel;
    if(data.employee.percinsiyet=='Kad??n'){
      this.mudurPersonel.peraskerdurum=null;
      this.mudurPersonel.perasteciltar=null;
    }
    data.ability = this.mudurPersonel.perTecrube;
   // this.photoUrl=this.lisansEmploye.photoSrc;   
    if (!data.employee.perkadro){
      return this.showAlert(NotificationTypes.warning,"Kadro Bo?? Olamaz","Personelin Kadrosu Se??ilmek Zorunda!");
    }

  

    if (!data.employee.percinsiyet){
        this.showAlert(NotificationTypes.warning,"Cinsiyet Bo?? Olamaz","Personelin Cinsiyeti Se??ilmek Zorunda!");
        return;
    }
    // if(this.mudurPersonel.permeslek=="dger"){
    //   this.mudurPersonel.permeslek=this.digMeslek;
    // }
    if (this._operation == DataOperations.create && data.employee.perid ==null){
        this.service.postWithPostModel<ResModel<number>, EmployeeViewModel>("insertEmployee", data, true).subscribe(
        res => {
          console.log(res);
          if (res.isSuccess) {
            this.showAlert(NotificationTypes.success, "Ba??ar??l??", "Personel Ba??ar?? ile Kaydedildi.");
            //{data: 1, isSuccess: true, message: null, errors: null} data sadece 1 geliyor.
            this.mudurPersonel.perid=res.data;
            this.searchByTC();
            //this.savePhoto();
            //this.mudurPersonel = new Employee();
          }
          else
            this.showAlert(NotificationTypes.error, "Ba??ar??s??z", "Personel Kaydetme ????lemi Ba??ar??s??z <br> "+res.message);

        },
        err => { console.log(err); }
      );
    }
    else
      this.service.postWithPostModel<ResModel<number>, EmployeeViewModel>("updateEmployee", data, true).subscribe(
        res => {
          console.log(res);
          if (res.isSuccess) {
            this.showAlert(NotificationTypes.success, "Ba??ar??l??", "Personel Ba??ar?? ile G??ncellendi.");
            //this.savePhoto();
            //this.mudurPersonel = new Employee();   
            this.searchByTC();
            this.editModal.hide();
          }
          else
            this.showAlert(NotificationTypes.error, "Ba??ar??s??z", "Personel G??ncelleme ????lemi Ba??ar??s??z.  <br> "+res.message);
        },
        err => {
          console.log(err);
          this.showAlert(NotificationTypes.error, "Hata", "Personel G??ncelleme i??leminde bir hata olu??tu.");
        }
      );
    
  }
  public saveEmployeeCikis() {
    let data: EmployeeViewModel = new EmployeeViewModel();
    this.mudurPersonel.perbmid = this.service.getCareCenterId();
    data.employee = this.mudurPersonel;
    data.ability = this.mudurPersonel.perTecrube;
    data.employee.kayitaktif=false;
    
    var r = confirm("????ten ????karmak ??stedi??inize Emin misiniz?");
    if (r == true)
    this.service.postWithPostModel<ResModel<Employee>, Employee>("EmployeeExit", this.mudurPersonel, true).subscribe(
      res => {
        console.log(res);
        if (res.isSuccess) {
          this.showAlert(NotificationTypes.success, "Ba??ar??l??", "Personel Ba??ar?? ile ????ten ????kar??ld??.");
          //this.mudurPersonel = new Employee();
        }
        else
          this.showAlert(NotificationTypes.error, "Ba??ar??s??z", "Personel G??ncelleme ????lemi Ba??ar??s??z");
      },
      err => {
        console.log(err);
        this.showAlert(NotificationTypes.error, "Hata", "Personel G??ncelleme i??leminde bir hata olu??tu.");
      }
    );
  }

  public newRecord() {
    this.mudurPersonel = new Employee();
  }

  public cancelPersonelity() {
    var r=confirm("Vazge??mek ??stedi??inizden eminmisiniz?");
    if(r!=true)
      return;
    this.getEmployee();
    this.mudurPersonel=new Employee();
    this.editModal.hide();
    //this.engelli.ikfoto = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';
  }
/*                                  FOTO??RAF ????LEMLER??                 */
  // public onFileSelected(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); 
  //     this._photo = event.target.files[0];
  //     reader.onload = (event) => { 
  //       this.photoUrl = reader.result.toString();
        
  //     }
  //   }
  // }
  // savePhoto() {
  //    console.log("savephoto");
  //    if (!this._photo)
  //      return;
  //    const fd = new FormData();
  //    fd.append('foto', this._photo);
  //    fd.append('id', this.mudurPersonel.perid.toString());
  //    this.service.post<any>("SaveEmployeePhoto", fd, true).subscribe(
  //      res => {
  //        console.log(res);
  //        this.showAlert(NotificationTypes.success, "Foto??raf Kayd?? Ba??ar??l??", "Personel Foto??raf?? Ba??ar?? ile Kaydedildi.");
  //      },
  //      err => { console.log(err); }
  //    );
  //  }
  //  getPhoto() {
  //    this.service.getPhoto("GetEmployeePhoto", this.mudurPersonel.perid).subscribe(
  //      res => {
  //        console.log(res);
  //        this.photoUrl = "data:image/png;base64," + res.data;

  //      },
  //      err => { console.log(err); }
  //    );
  //  }

  public showAlert( type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }

}

