import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';
import { DisabilityViewModel } from '../bireyselBakimPlan/bireyselBakimPlan.component';
import { ActivatedRoute } from '@angular/router';
import { NotificationTypes } from '../../../enums/notificationTypes.enum';
import { ToasterService } from 'angular2-toaster';
import { Disabled } from '../../../models/Disabled';
import { DrugTreatmentPlanListComponent } from '../Lists/drugTreatmentPlanList/drugTreatmentPlanList.component';

@Component({
  selector: 'app-drugTreatmentPlan',
  templateUrl: './drugTreatmentPlan.component.html',
  styleUrls: ['./drugTreatmentPlan.component.scss']
})
export class DrugTreatmentPlanComponent implements OnInit {
  public _drug: DtpPlannedDrugs = new DtpPlannedDrugs();
  public dtpPlannedDrugs: DtpPlannedDrugs[] = [];
  public ikids:number;
  @ViewChild(DrugTreatmentPlanListComponent)
  public drugTreatmentPlanList:DrugTreatmentPlanListComponent;
  constructor(private service: AppServiceService, private route: ActivatedRoute, private toasterService: ToasterService) { }
  public drugname: string;

  ngOnInit() {
    this.getDrugTreatmentPlan();
  }

  public getDrugTreatmentPlan() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'] || 0;
      if (id != 0)
      this.ikids = id;
      this.getDrugTreatmentPlanWithDurgs();
    });
  }
 
  //Get Engel by ID
  getDrugTreatmentPlanWithDurgs() {
    this.service.postWithPostModel<ResModel<any>, Number>("getAllDrugPlan",this.ikids).subscribe(
        res => {
          console.log(res);
          console.log("getAllDrugPlan");
          this._drug.ikadi=res.data[0].ikadi;
          this._drug.ikbabaadi=res.data[0].ikbabaadi;
          this._drug.ikcinsiyet=res.data[0].ikcinsiyet;
          this._drug.iktcno=res.data[0].iktcno;
          this._drug.ikdogtar=res.data[0].ikdogtar;
          this._drug.ikengelligrubu=res.data[0].ikengelligrubu;

          this.dtpPlannedDrugs=res.data;

          /*if((this._drug.itp_pasif==false) && (!this._drug.itp_stoplama_tar==null))
          this._drug=res.data;
          if(this._drug.itp_pasif==true)
          this._drug=res.data;*/
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
          this.showAlert(NotificationTypes.success, "Tekrar Planlama Başarılı", "İlaç Tekrarlandı.");
          this.getDrugTreatmentPlanWithDurgs();
        },
        err => {
          console.log(err);
        }
      );
    }
    reLoginTekrarlastirma(){
      this.rePlanned();
    }
  //İlaç Stoplama İşlemlerinin Gerçekleştiği Yer
  stopDrug() {
    this.service.postWithPostModel<ResModel<number>, DtpPlannedDrugs>("suspended", this._drug, true).subscribe(
      res => {
        console.log(res);
        this.showAlert(NotificationTypes.success, "Stoplama İşlemi Başarılı", "İlaç Stoplandı.");
        this.getDrugTreatmentPlanWithDurgs();
      },
      err => { console.log(err); }
    );
  }
  editDrug(drug) {
    this._drug = drug;
    this._drug.itp_ilac_id=drug.itp_ilac_id;
    this._drug.itp_planlanan_bas_tar = new Date(drug.itp_planlanan_bas_tar);
    this._drug.itp_planlanan_bit_tar = new Date(drug.itp_planlanan_bit_tar);
    this.drugname = drug._ilacadi;
    /*if(this._drug.durum==3)
    this._drug.stoplama_tarihi = new Date(drug.stoplama_tarihi);*/
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
	public itp_duz_sag_per:string;
	public itp_stoplama_tar:Date;
	public itp_yeniden_aktiflestirme_tar:Date;
	public itp_yeniden_aktif_hekim:string;
	public itp_pasif:boolean;
	public itp_user_id:number;
	public itp_datetime:Date;
	public itp_updatedate:Date;
	public itp_engelliid:number;
  public itp_bmid:number;
  public ikid:number;
  public ikadi:string;
  public ikbabaadi:string;
  public ikcinsiyet:string;
  public ilacadi:string;
  public iktcno:string;
  public ikengelligrubu:string;
  public ikdogtar:Date;
  public  itp_stoplayan_hekim:string;
	public  itp_kalan_ilac_miktari:string;
  constructor() {
    this.itp_planlanan_ver_yolu = null;
    this.itp_planlanan_doz = null;
    this.itp_planlanan_ver_zamani = null;
    this.itp_oneri = null;
  }
}
