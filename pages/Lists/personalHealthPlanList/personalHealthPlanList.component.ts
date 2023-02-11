import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../../../services/appService.service';
import { ResModel } from '../../../../models/resModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService, ModalDirective } from 'ngx-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { OperationType } from '../../../../models/OperationType.enum';
import { SearchEmployeeComponent } from '../../../../components/searchEmployee/searchEmployee.component';
import { DisablitySearchWithTypeHeadComponent } from '../../../../components/disablitySearchWithTypeHead/disablitySearchWithTypeHead.component';
import { NotificationTypes } from '../../../../enums/notificationTypes.enum';

@Component({
  selector: 'app-personalHealthPlanList',
  templateUrl: './personalHealthPlanList.component.html',
  styleUrls: ['./personalHealthPlanList.component.scss']
})
export class PersonalHealthPlanListComponent implements OnInit {
  public list: PersonalHealthPlanReport[] = [];
  @ViewChild(SearchEmployeeComponent)
  public childEmployeName:SearchEmployeeComponent;
  @ViewChild(DisablitySearchWithTypeHeadComponent)
  public childEngelliAdi: DisablitySearchWithTypeHeadComponent;
  //public _plan: PersonalHealthPlan = new PersonalHealthPlan();
  public _report: PersonalHealthPlanReport = new PersonalHealthPlanReport();
  public personalModelFilter:PersonalHealthPlanFilterModel= new PersonalHealthPlanFilterModel();
  public careCenterName: string;

  constructor(private service: AppServiceService,private http: HttpClient, private route: ActivatedRoute, private toasterService: ToasterService,private localeService: BsLocaleService) {
    this.localeService.use('tr');
   }
  public _photoUrl = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";

  ngOnInit() {
    this.getPersonalHealthPlanFilterModel();
  }

  public editReport(report) {
    this._report = report;
    this._report.bas_tar = new Date(report.bas_tar);
    this._report.bitis_tar = new Date(report.bitis_tar);
    this.childEmployeName._employeename=report.peradi;

    this._report.degerlendirme_tar = new Date(report.degerlendirme_tar);
    

  }
  cleanPlans(){
    this._report=new PersonalHealthPlanReport();
    this.childEngelliAdi.model="";
    this.childEmployeName._employeename="";
   }
  addReport() {
    if (!this._report.id)
      this._report._modify = OperationType.added;
    else
      this._report._modify = OperationType.updated;
  
    this.savePersonalHealthPlan();
  }
  savePersonalHealthPlan() {
    this._report.aktif_kayit=true;
    this.service.postWithPostModel<ResModel<PersonalHealthPlanReport>, PersonalHealthPlanReport>("savePersonalHealthPlan", this._report, true).subscribe(
      res => { 
        console.log(res); 
        this._report = res.data; 
        this.getPersonalHealthPlanFilterModel();
        this.cleanPlans();
      },
      err => { console.log(err); }
    );
  }
  public getDisablitiyId($event) {
    let id: number = $event;
    this._report.engelli_id= id;
  }
  public getEmployeeId($event){
    let id:number=$event;
    this._report.personel_id=id;
  }
  public getEmployeeStopId($event){
    let id:number=$event;
    this._report.stoplayan_perid=id;
  }
  public getSuspendedPlan() {
    
    this.service.postWithPostModel<ResModel<PersonalHealthPlanReport>, PersonalHealthPlanReport>("PhpGetSuspended", this._report, true).subscribe(
      res => {
        console.log(res);
        this.showAlert(NotificationTypes.success, "Stoplama İşlemi Başarılı", "Plan Stoplandı.");
        this.getPersonalHealthPlanFilterModel();
      },
      err => { console.log(err); }
    );
  }
  public getPersonalHealthPlanFilterModel() {
    let url: string = "getListPersonalHealthPlanFilter";
    /*console.log(this.filter);
    if (this.filter.grub=="null") 
    this.filter.grub=null;
    if (this.filter.cinsiyet=="null") 
    this.filter.cinsiyet=null;
    if(this.personalModelFilter._yapilacak_faaliyet==null)
    this.personalModelFilter._yapilacak_faaliyet="d";*/
    this._report.bmid=this.service.getCareCenterId();
    this.service.postWithPostModel<ResModel<PersonalHealthPlanReport[]>, PersonalHealthPlanFilterModel>(url,this.personalModelFilter).subscribe(
        res => {
          console.log(res);
          this.list= res.data;
        },
        err => {
          console.log(err);
        }
      );
  }
  private showAlert(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }
}
export class PersonalHealthPlanFilterModel{
  public _engelliAdiSoyadi:string;
	public bbas_tar:Date;
	public sbitis_tar:Date;
  public _yapilacak_faaliyet:string;
  public durum:string="p";
}
export class PersonalHealthPlanReport {
  public id: number;
  public bas_tar: Date;
  public bitis_tar: Date;
  public yapilacak_faaliyet: string;
  public siklik: string;
  public ilgili_dokuman: string;
  public degerlendirme_tar: Date;
  public degerlendirme: string;
  public degerlendiren_id: number;
  public kayit_durum: number;
  public createuserid: number;
  public createdate: Date;
  public updatedate: Date;
  public stoplama_tar:Date;
	public duzenleme_tar:Date;
  public engelli_id:number;
  public bmid:number;
  public personel_id:number;
  public aktif_kayit:boolean;
  public stoplama_gerekce:string;
	public stoplayan_perid:number;
  public _modify: OperationType;
  
}