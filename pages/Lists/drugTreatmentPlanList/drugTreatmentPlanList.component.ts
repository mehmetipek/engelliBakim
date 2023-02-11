import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../../../services/appService.service';
import { ResModel } from '../../../../models/resModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService, ModalDirective } from 'ngx-bootstrap';
import { ToasterService } from 'angular2-toaster';
import { DisabilityViewModel } from '../../bireyselBakimPlan/bireyselBakimPlan.component';
import { NotificationTypes } from '../../../../enums/notificationTypes.enum';
import { EmployeeSearchViewModel, SearchEmployeeComponent } from '../../../../components/searchEmployee/searchEmployee.component';
import { DisablitySearchWithTypeHeadComponent } from '../../../../components/disablitySearchWithTypeHead/disablitySearchWithTypeHead.component';
import { SearchDrugComponent } from '../../../../components/searchDrug/searchDrug.component';

@Component({
  selector: 'app-drugTreatmentPlanList',
  templateUrl: './drugTreatmentPlanList.component.html',
  styleUrls: ['./drugTreatmentPlanList.component.scss']
})
export class DrugTreatmentPlanListComponent implements OnInit {
  public planlarList:DtpPlannedDrugs[]=[];
  public _drug: DtpPlannedDrugs = new DtpPlannedDrugs();
  //Engelli Adı vs..
  @ViewChild(DisablitySearchWithTypeHeadComponent)
  public childEngelliAdi: DisablitySearchWithTypeHeadComponent;
  //İlaç Adı vs..
  @ViewChild(SearchDrugComponent)
  public childIlacAdi:SearchDrugComponent;

  @ViewChild(SearchEmployeeComponent)
  public childEmployeName:SearchEmployeeComponent;
  public drugname: string;

  public filter:DrugTreatmentPlanFilter=new DrugTreatmentPlanFilter();
  constructor(private service: AppServiceService,private http: HttpClient, private route: ActivatedRoute, private toasterService: ToasterService,private localeService: BsLocaleService) { 
    this.localeService.use('tr');
  }
  public _photoUrl = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";

  ngOnInit() {
    //this.getAllDrugTreatmentPlan();
    this.getAllDrugTreatmentPlanByFilter();
  }
  /**--------------------------------------------------------------------------------------------------------------------- */
  getDrugTreatmentPlan() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'] || 0;
      if (id != 0)
        this._drug.itp_engelliid = id;
      this.getDrugTreatmentPlanWithDurgs();
    });
  }

  /**--------------------------------- */
  public getAllDrugTreatmentPlan() {
    this.service.postWithPostModel<ResModel<any>, number>("getAllDrugTreatmentPlanByBmId", this.service.getCareCenterId()).subscribe(
      res => {
        console.log(res);
        this._drug = res.data;
        console.log("getAllDrugTreatmentPlan");
      },
      err => { console.log(err) }
    )
  }
  public getAllDrugTreatmentPlanByFilter() {
    this.service.postWithPostModel<ResModel<any>, DrugTreatmentPlanFilter>("getSearchDrug", this.filter).subscribe(
      res => {
        console.log(res);
        console.log("getAllDrugTreatmentPlanByFilter");
        if(this.filter.durum=="p")
        this.planlarList = res.data;
        if(this.filter.durum=="s")
        this.planlarList = res.data;
        if(this.filter.durum=="t")
        this.planlarList = res.data;
      },
      err => { console.log(err) }
    )
  }
  
  //Get Plan by ID
  getDrugTreatmentPlanWithDurgs() {
    this.service.postWithPostModel<ResModel<DtpPlannedDrugs>, Number>("getAllDrugPlan", this._drug.id).
      subscribe(
        res => {
          this._drug = res.data;
        },
        err => { console.log(err); }
      );
  }
  public getEmployest(employee: EmployeeSearchViewModel) {
    if (!employee) return console.log("employee is null");
    //this._drugTreatmentPlanViewModel.dtpPlannedDrugs[0].itp_duz_sag_perid=employee.perid;
  }
  
  save() {
    if (!this._drug.itp_ilac_id)
      return alert("İlaç Seçiniz..");
      if (!this._drug.itp_engelliid)
      return alert("Engelli Seçiniz..");
      if (!this._drug.itp_duz_sag_per)
      return alert("Personel Seçiniz..");
    //this._drug.itp_planlanan_ilac_id = this._drugTreatmentPlanViewModel.drugtreatmentplan.id;
    /*let model: DrugTreatmentPlanViewModel = new DrugTreatmentPlanViewModel();
    model.dtpPlannedDrugs.push(this._drug);
    model.drugtreatmentplan = this._drugTreatmentPlanViewModel.drugtreatmentplan;*/
    
    // this._drugTreatmentPlanViewModel.DtpPlannedDrugs = this._drug;
    //if (this._drug.itp_planlanan_ilac_id)
      this.insertDrug();

  }
  cleanPlans(){
  this._drug=new DtpPlannedDrugs();
  this.childEngelliAdi.model="";
  this.childIlacAdi._drugname="";
  this.childEmployeName._employeename="";
 }
  insertDrug() {//model
    this._drug.itp_bmid=this.service.getCareCenterId();
    this.service.postWithPostModel<ResModel<DtpPlannedDrugs>, DtpPlannedDrugs>("insertDrugTreatmentPlanViewModel", this._drug, true).subscribe(
      res => {
        console.log(res);
        //if (res.isSuccess) { Success null değer dönmektedir o yüzden if işlemi gerçekleştirmiyor..
          this.showAlert(NotificationTypes.success, "Kayıt İşlemi Başarılı", "İlaç Tedavi Planı Başarı ile Kaydedildi!");
          this.getAllDrugTreatmentPlanByFilter();
          this.cleanPlans();
        //}
      },
      err => { console.log(err); }
    );
  }
  //İlaç Stoplama İşlemlerinin Gerçekleştiği Yer
  stopDrug() {
    this.service.postWithPostModel<ResModel<number>, DtpPlannedDrugs>("suspended", this._drug, true).subscribe(
      res => {
        console.log(res);
        this.showAlert(NotificationTypes.success, "Stoplama İşlemi Başarılı", "İlaç Stoplandı.");
        this.getAllDrugTreatmentPlanByFilter();
      },
      err => { console.log(err); }
    );
  }
  getDrug(drug) {
    console.log(drug);
    this._drug.itp_ilac_id = drug.ilacid;
  }
  editDrug(plan) {
    this._drug = plan;
    this.drugname = plan.ilacadi;
    this.childEngelliAdi.model=plan.ikadi;
    this.childEmployeName._employeename=plan.peradi;
    this._drug.itp_planlanan_bas_tar = new Date(plan.itp_planlanan_bas_tar);
    this._drug.itp_planlanan_bit_tar = new Date(plan.itp_planlanan_bit_tar);
    //this._employeename=plan.
    /*if(this._drug.durum==3)
    this._drug.stoplama_tarihi = new Date(drug.stoplama_tarihi);*/
  }
  deleteDrug(drug) {
    // this._drug = drug;
    // this._drug.baslangic_tarihi = new Date(drug.baslangic_tarihi);
    // this._drug.bitis_tarihi = new Date(drug.bitis_tarihi);
    // this.drugname = drug._ilacadi;
    // if(this._drug.durum==3)
    // this._drug.stoplama_tarihi = new Date(drug.stoplama_tarihi);
  }
  /*public getDisablity(disabilityId: number) {
    this.service.postWithPostModel<ResModel<DisabilityViewModel[]>, number>("getFirstAcceptanceById", disabilityId).subscribe(
      res => {
        this._disability = res.data[0];
      },
      err => {
        console.log(err);
      }
    );
  }*/
  public getDisablitiyId($event) {
    let id: number = $event;
    this._drug.itp_engelliid = id;
    //Backend Yazıldıktan sonra aktifleştirilecek.
    //this.getDrugTreatmentPlanByDisabledId(id);
  }
  public getEmployeeId($event){
    let id:number=$event;
    this._drug.itp_duz_sag_per=id;
  }
  getDrugTreatmentPlanByDisabledId(id: number) {
    this.service.postWithPostModel<ResModel<DtpPlannedDrugs>, Number>("getDrugTreatmentPlanByDisabledId", this._drug.id).
    subscribe(
      res => {
        this._drug = res.data;
      },
      err => { console.log(err); }
    );
  }
  /** Tekrar Planlama */
  public rePlanned() {
    this._drug.itp_bmid = this.service.getCareCenterId();
    this.service.postWithPostModel<ResModel<DtpPlannedDrugs>, DtpPlannedDrugs>("planned", this._drug, true).subscribe(
      res => {
        console.log(res);
        this.getAllDrugTreatmentPlanByFilter();
      },
      err => {
        console.log(err);
      }
    );
  }
  reLoginTekrarlastirma(){
    this.rePlanned();
    this.getAllDrugTreatmentPlanByFilter();
  }
  private showAlert(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }
}
export class DtpPlannedDrugs {
  public id:number;
	public itp_ilac_id:number;
	public itp_ilacmiktari:number;
	public itp_planlanan_doz:string;
	public itp_oneri:string
	public itp_planlanan_bas_tar:Date;
	public itp_planlanan_bit_tar:Date;
	public itp_planlanan_ver_yolu:string;
	public itp_planlanan_ver_zamani:string;
	public itp_recete_kodu:string;
	public itp_duz_sag_per:number;
	public itp_stoplama_tar:string;
	public itp_yeniden_aktiflestirme_tar:Date;
	public itp_yeniden_aktif_hekim:string;
	public itp_pasif:boolean;
	public itp_user_id:number;
	public itp_datetime:Date;
	public itp_updatedate:Date;
	public itp_engelliid:number;
	public itp_bmid:number;
  public ikadi:string;
  public ilacadi:string;
  public  itp_stoplayan_hekim:string;
  public  itp_kalan_ilac_miktari:string;
  
  constructor() {
    this.itp_planlanan_ver_yolu = null;
    this.itp_planlanan_doz = null;
    this.itp_planlanan_ver_zamani = null;
    this.itp_oneri = null;
  }
}
export class DrugTreatmentPlanFilter {
	
	public _engelli_adi:string;
	public baslangic_tar:Date;
	public bitis_tar:Date;
	public _ilac_adi:string;
  public durum:string="p";
  //public ikid:number;
}