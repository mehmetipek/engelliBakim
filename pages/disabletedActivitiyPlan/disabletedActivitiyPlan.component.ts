import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons
} from "../../../../../node_modules/@ng-bootstrap/ng-bootstrap";
import { AppServiceService } from "../../../services/appService.service";
import { ResModel } from "../../../models/resModel";
import { DisabilityViewModel } from "../bireyselBakimPlan/bireyselBakimPlan.component";
import { EmployeeSearchViewModel } from "../../../components/searchEmployee/searchEmployee.component";
import { OperationType } from "../../../models/OperationType.enum";
import { daLocale, ModalDirective } from "ngx-bootstrap";
import { NotificationTypes } from "../../../enums/notificationTypes.enum";
import { ToasterService } from "angular2-toaster";
import { empty } from "rxjs";
import { WorkRecordBook } from "../../../components/workRegistry/workRegistry.component";

@Component({
  selector: "app-disabletedActivitiyPlan",
  templateUrl: "./disabletedActivitiyPlan.component.html",
  styleUrls: ["./disabletedActivitiyPlan.component.scss"]
})
export class DisabletedActivitiyPlanComponent implements OnInit {
  public url ="http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  public _photo: File;
  modalReference: any;
  closeResult: string;
  public _activityView: ActivityPlan = new ActivityPlan();
  public _activityList: ActivityPlan[] = [];
  public _ay: number;
  public _yil: number;
  public _disabilityListonSearch: DisabilityViewModel[] = [];
  public _disabilityname: string;
  public _username: string = this.service.getUserName();
  public message: string;
  public _meslekiSiraNo: number;
 public _pln:string;

  public filter: ActivityPlanFilter = new ActivityPlanFilter();
  
  public _workRecordBookList: WorkRecordBook[] = [];
  public _workRecordBook: WorkRecordBook = new WorkRecordBook();

  @ViewChild("modalPlannedActivity") modalPlannedActivity: ModalDirective;
  @ViewChild("modalEvaluation") modalEvaluation: ModalDirective;
  constructor(
    private service: AppServiceService,
    private toasterService: ToasterService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    /* this._ay = 1;
    this._yil = 2018;*/
    this._ay = null;
    this._yil = null;
  }

  getFilterByStaff(s) {
      this.filter.epYeri = s;
      this.filter.epAy=this._ay;
          this.filter.epYil=this._yil;
      if((this._ay!=null) ||(this._yil!=null)){
        
        this.getEmployeeListByFilter();
      }
  }
  getFilterByCins(s) {
    this.filter.epTuru = s;
    this.filter.epAy=this._ay;
          this.filter.epYil=this._yil;
    if((this._ay!=null) ||(this._yil!=null)){
      this.getEmployeeListByFilter();
    }
  }
  public getEmployeeListByFilter() {
    
    console.log(this.filter);
    this.filter.epAy=this._ay;
    this.filter.epYil=this._yil;
    //this.filter.epSorumlusu=this._activityView._sorumlu_mud_ad;
    if (this.filter.epYeri == "null") this.filter.epYeri = null;
    if (this.filter.epTuru == "null") this.filter.epTuru = null;
    this.service.postWithPostModel<ResModel<ActivityPlan[]>, ActivityPlanFilter>("getActivityFilter",this.filter)
      .subscribe(
        res => {
          console.log(res);
          this._activityList = res.data;
        },
        err => {
          console.log(err);
        }
      );
  }
  newActivty(content) {
    this._activityView = new ActivityPlan();
    this.open(content);
  }
  open(content) {
    this.modalReference = this.modalService.open(content, { size: "lg" });
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  editPlanned(plan){
    this._activityView = plan;
    this._activityView.ep_plan_tahmini_tarih = new Date(plan.ep_plan_tahmini_tarih);
    
  }
  public getActivityList(ay?, yil?) {
    let tarih: number[] = [];
    tarih.push(ay ? ay : this._ay);
    tarih.push(yil ? yil : this._yil);
    
    this.service.postWithPostModel<ResModel<ActivityPlan[]>, number[]>(
        "getActivityPlanList",
        tarih,
        true
      )
      .subscribe(
        res => {
          console.log(res);
          this._activityList = res.data;
          if (this._activityList.length > 0)
            // if (this._activityList[0].ep_mesleki_kayit_no)
            this._meslekiSiraNo = this._activityList[0]._mes_sira_no;
          else this._meslekiSiraNo = null;
        },
        err => {
          console.log(err);
        }
      );
  }

  saveActivity() {
    if (this._activityView.ep_sorumlusu_id == null) {
      this.message = "Sorumlu Personel Seçilmemiş!";
      return;
    }
    if (this._ay == null || this._yil == null) {
      this.showAlert(NotificationTypes.error,"KAYIT EDERKEN HATA OLUŞTU.","AY ve YIL BOŞ OLAMAZ!");
    }
    if((this._ay!=null) ||(this._yil!=null)){
    if (!(this._activityView.ep_mesleki_kayit_no > 0)){ 
    this._activityView._mes_sira_no=this._meslekiSiraNo;
    debugger;
  //  if(this._meslekiSiraNo!>0)
  // this.insertWorkRecordBook();
    /*if(this._meslekiSiraNo==null){ 
    
  }*/
  }
    this._pln="0";
    if (this._activityView.ep_mesleki_kayit_no > 0) {
      if (!this._activityView.id) {    
        this._activityView.ep_ay = this._ay;
        this._activityView.ep_yil = this._yil;
        this._activityView.ep_planli_siz = planType.planli;
        this.insertActivity();
      } else this.updateActivity();
    } 
  }
}
  saveUnplannedActivity() {
    if (this._activityView.ep_sorumlusu_id == null) {
      this.message = "Sorumlu Personel Seçilmemiş!";
      return;
    }
    if (this._ay == null || this._yil == null) {
      this.showAlert(
        NotificationTypes.error,
        "Kayıt Ederken Hata Oluştu.",
        "AY ve YIL BOŞ OLAMAZ!"
      );
    }
    /*
    if (!(this._activityView.ep_mesleki_kayit_no > 0)){
      this._activityView._mes_sira_no=this._meslekiSiraNo; 
      if(this._meslekiSiraNo==null){ 
        this.insertWorkRecordBook();
      }
  }*/
    this._pln="1";
    if (this._activityView.ep_mesleki_kayit_no > 0) {
      if (!this._activityView.id) {
        this._activityView.ep_ay = this._ay;
        this._activityView.ep_yil = this._yil;
        this._activityView.ep_planli_siz = planType.plandisi;
       
        this.insertActivity();
      } else this.updateActivity();
    } 
    /*if (!this._activityView.id) {
      this._activityView.ep_ay = this._ay;
      this._activityView.ep_yil = this._yil;
      this._activityView.ep_planli_siz = planType.plandisi;
     

      this.insertActivity();
    } else this.updateActivity();*/
  }
  insertActivity() {
    this.service
      .postWithPostModel<ResModel<ActivityPlan>, ActivityPlan>(
        "insertActivityPlan",
        this._activityView,
        true
      )
      .subscribe(
        res => {
          console.log(res);

          this.getActivityList();
          this.modalReference.close();

          // if (res.isSuccess)
          //   this._activityList.push(res.data);
        },
        err => {
          console.log(err);
        }
      );
  }
  updateActivity() {
    this.service
      .postWithPostModel<ResModel<ActivityPlan>, ActivityPlan>(
        "updateActivityPlan",
        this._activityView,
        true
      )
      .subscribe(
        res => {
          console.log(res);
          if (res.isSuccess)  this.showAlert(NotificationTypes.success,"Başarılı.","Başarı ile güncellendi!");
          this.modalReference.close();
          this.getActivityList();
        },
        err => {
          console.log(err);
        }
      );
  }
  public getDisability() {
    this.service
      .postWithPostModel<ResModel<DisabilityViewModel[]>, string>(
        "getFirstAcceptanceBySearch",
        this._disabilityname
      )
      .subscribe(
        res => {
          console.log(res);
          this._disabilityListonSearch = res.data;
        },
        err => {
          console.log(err);
        }
      );
  }
  onSearchDisability(searchValue: string) {
    if (searchValue.length > 0) {
      this.getDisability();
    }
  }
  selectDisability(value: DisabilityViewModel) {
    if (!value) return;
    // tabloya ekle
  }
  public addEmployeetoActivity(employee: EmployeeSearchViewModel) {
    if (!employee) return console.log("employee is null");
    let per: ActivityPersonel = new ActivityPersonel();
    per.personel_id = employee.perid;
    per._peradi = employee.peradi + " " + employee.persoyadi;
    per._modify = OperationType.added;
    per.etkinlik_id = this._activityView.id;
    if (!this._activityView._activityPersonel)
      this._activityView._activityPersonel = [];
    this._activityView._activityPersonel.push(per);
  }
  public removeEmplyeeFromActivity(employee: ActivityPersonel) {
    if (confirm("Personeli Çıkarmak İstediğinizden Emin misiniz?"))
      employee._modify = OperationType.deleted;
  }
  public addDisablitiytoActivity(disablity: DisabilityViewModel) {
    if (!disablity) return console.log("disablity is null");
    let dis: ActvityDisabled = new ActvityDisabled();
    dis.engelli_id = disablity.ikid;
    dis._ikadi = disablity.ikadisoyadi;
    dis._modify = OperationType.added;
    dis.etkinlik_id = this._activityView.id;
    if (!this._activityView._activityDisabled)
      this._activityView._activityDisabled = [];
    this._activityView._activityDisabled.push(dis);
  }
  
  public removeDisablitiyFromActivity(disablity: ActvityDisabled) {
    if (confirm("Engelliyi Çıkarmak İstediğinizden Emin misiniz?"))
      disablity._modify = OperationType.deleted;
  }
  public plannedActivityResponsibility(employee: EmployeeSearchViewModel) {
    if (!employee) return console.log("employee is null");
    this._activityView.ep_sorumlusu_id = employee.perid;
    
  }
  //Etkinliğe katılan personel ve engelliler.
  public getParticipantsToActivity(activity: ActivityPlan) {
    this._activityView = activity;

    this.service
      .postWithPostModel<ResModel<ActivityPlan>, number>(
        "getparticipants",
        activity.id,
        true
      )
      .subscribe(
        res => {
          console.log(res);
          if (res.data._activityPersonel)
            this._activityView._activityPersonel = res.data._activityPersonel;
          if (res.data._activityDisabled)
            this._activityView._activityDisabled = res.data._activityDisabled;
        },
        err => {
          console.log(err);
        }
      );
  }
  // Foto Kayıt İşlemleri-----------------------------------------------------------
  public onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this._activityView.ep_deg_foto1_id = event.target.files[0];
      reader.onload = event => {
        // called once readAsDataURL is completed
        this.url = reader.result.toString();
        //  let selectfile: File = event.target;

        // this.engelli.ikfoto= event.target.files[0];
      };
    }
  } 
  /*
  public onFileSelected_disabletedActivitiyPlan(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      //this._disabilityReport._reportimage = event.target.files[0];
      reader.onload = (event) => { // called once readAsDataURL is completed
        this._activityView.deg_etkinlik_goruntu1 = reader.result.tostring();
        //  let selectfile: File = event.target;

        // this.engelli.ikfoto= event.target.files[0];
      }
    }
  }
  savePhoto() {
    if (!this._activityView)
      return;
    const fd = new FormData();
    fd.append('foto', this._photo);
    fd.append('id', this._activityView.deg_etkinlik_sorumlusu_id.tostring());
    this.service.post<any>("insertActivityPlan", fd, true).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }
  getPhoto() {
    this.service.getPhoto("GetFirsAcceptencePhoto", this._activityView.deg_etkinlik_sorumlusu_id).subscribe(
      res => {
        console.log(res);

        this.url = "data:image/png;base64," + res.data;
      },
      err => { console.log(err); }
    );
  }
  */
  public insertWorkRecordBook() {
    this.service.postWithPostModel<ResModel<WorkRecordBook>, WorkRecordBook>("insertWorkRecordBook",this._workRecordBook,true)
      .subscribe(
        res => {
          console.log(res);
          this._activityView.ep_mesleki_kayit_no = res.data.id;
          if(this._pln=="0"){
            this.saveActivity();
          }
          else
          this.saveUnplannedActivity();
        },
        err => {
          console.log(err);
        }
      );
  }
  public updateWorkRecordBook() {
    this.service
      .postWithPostModel<ResModel<WorkRecordBook>, WorkRecordBook>(
        "updateWorkRecordBook",
        this._workRecordBook,
        true
      )
      .subscribe(
        res => {
          console.log(res);
          this._workRecordBook = res.data;
        },
        err => {
          console.log(err);
        }
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
  public addWorkRecordBook() {
    if (this._workRecordBook.id > 0) {
      this.updateWorkRecordBook();
    } else {
      this.insertWorkRecordBook();
    }
  }
  private showAlert(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }
}
export class ActivityPlan {
  public id: number;
  public ep_bmid: number;
  public ep_mesleki_kayit_no: number;
  public ep_ay: number;
  public ep_yil: number;
  public ep_planli_siz: string;
  public ep_olusturma_tarihi: Date;
  public ep_adi: string;
  public ep_yeri: string;
  public ep_yeri_adi: string;
  public ep_plan_tahmini_tarih: Date;
  public ep_sorumlusu_id: number;
  public ep_engelli_sayisi: number;
  public ep_turu: string;
  public ep_deg_yap_faaliyet: string;
  public ep_deg_oneriler: string;
  public ep_deg_sorumlu_id: number;
  public ep_deg_foto1_id: number;
  public ep_deg_foto2_id: number;
  public ep_deg_foto3_id: number;
  public ep_deg_foto4_id: number;
  public ep_deg_foto5_id: number;
  public ep_deg_foto6_id: number;
  public ep_user_id: number;
  public ep_datetime: Date;
  public updatedate: Date;
  public _activityPersonel: ActivityPersonel[] = [];
  public _activityDisabled: ActvityDisabled[] = [];
  public _sorumlu_mud_ad: string;
  public _mes_sira_no:number;
  constructor() {
    this.ep_turu = null;
    this.ep_yeri = null;
    
  }
}

export enum planType {
  planli = "0",
  plandisi = "1"
}

export enum operationType {
  none,
  added,
  updated,
  deleted
}
export class ActivityPersonel {
  public id: number;
  public etkinlik_id: number;
  public personel_id: number;
  public createdate: Date;
  public updatedate: Date;
  public _peradi: string;
  public _modify: OperationType;
  public ekp_bmid: number;
  public ekp_epid: number;
  public ekp_personelid: number;
}
export class ActvityDisabled {
  public etkinlik_id: number;
  public engelli_id: number;
  public createdate: Date;
  public updatedate: Date;
  //---------
  public id: number;
  public eke_bmid: number;
  public eke_epid: number;
  public eke_engelliid: number;
  public eke_createdate: Date;
  public eke_updatedate: Date;
  public _ikadi: string;
  public _modify: OperationType;
}

export class ActivityPlanFilter{
  public  epAdi:string;
	public  epSorumlusu:string;
	public  epYeri:string;
  public  epTuru:string;
  public  epAy:number;
  public  epYil:number;
  constructor(){
    this.epTuru=null;
    this.epYeri=null;
  }
}
