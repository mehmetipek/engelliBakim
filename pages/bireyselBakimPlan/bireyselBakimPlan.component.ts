import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { IndividualCarePlanModel } from '../../../models/IndividualCarePlanModel';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';
import { ActivatedRoute } from '@angular/router';
import { NotificationTypes } from '../../../enums/notificationTypes.enum';
import { ToasterService } from 'angular2-toaster';
import { WorkRegistryComponent } from '../../../components/workRegistry/workRegistry.component';

@Component({
  selector: 'app-bireyselBakimPlan',
  templateUrl: './bireyselBakimPlan.component.html',
  styleUrls: ['./bireyselBakimPlan.component.scss']
})
export class BireyselBakimPlanComponent implements OnInit {

  @ViewChild('modalIndividualCareServiceEvaluation') CareServiceEvaluationModal: ModalDirective;
  @ViewChild('modalHizmetAnalizi') modalHizmetAnalizi: ModalDirective;
  @ViewChild(WorkRegistryComponent) _workRegistry: WorkRegistryComponent;

  public plan: IndividualCarePlanPageViewModel = new IndividualCarePlanPageViewModel();
  public _disabilityname: string;
  public _disabilityList: DisabilityViewModel[] = [];
  public _disability: DisabilityViewModel = new DisabilityViewModel();
  public _careCenterName: string = this.service.getCareCenterName();
  //Evilation
  public _maintenanceServicesEvaluation: MaintenanceServicesEvaluation = new MaintenanceServicesEvaluation();
  public _psychoSocialAnalysisEvaluation: PsychoSocialAnalysisEvaluation = new PsychoSocialAnalysisEvaluation();

  //EvilationLİsts
  public _maintenanceServicesEvaluationList: MaintenanceServicesEvaluation[] = [];
  public _psychoSocialAnalysisEvaluationList: PsychoSocialAnalysisEvaluation[] = [];
  constructor(private service: AppServiceService, private route: ActivatedRoute, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getIndividualCarePlanId();
  }
  getIndividualCarePlanId() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'] || 0;
      if (id != 0) {
        this.plan.individualcareplan.id = id;
        this.getIndividualCarePlanById();
      }
      else {
        this.getIndividualCarePlanPageViewModel();
        this.getPersonalCareServices();
        this.getAllPsychoSocialServices();
      }
    });
    console.log("plan.individualcareplan.id:"+this.plan.individualcareplan.id)
  }
  getIndividualCarePlanById() {
    this.service.postWithPostModel<ResModel<IndividualCarePlanPageViewModel>, number>("getIndividualCarePlanById", this.plan.individualcareplan.id).subscribe(
      res => {
        console.log(res);
        if (res.isSuccess) {
          this.plan = res.data;
          this.plan.individualcareplan.duzenlemetar = new Date(this.plan.individualcareplan.duzenlemetar);
          this.plan.individualcareplan.bbpkapkayittar = new Date(this.plan.individualcareplan.bbpkapkayittar);
          this.plan.individualcareplan.planbastar = new Date(this.plan.individualcareplan.planbastar);
          this.plan.individualcareplan.planbitistar = new Date(this.plan.individualcareplan.planbitistar);
          this.plan.individualcareplan.yenidendegtar = new Date(this.plan.individualcareplan.yenidendegtar);
          this._careCenterName = this.service.getCareCenterName();

          if (this.plan.individualcareplan.engelli_ikid)
            this.getDisablity();
        }

      },
      err => { console.log(err); }
    );
  }
  public savePlan() {
    console.log("saveplan()");
    // this.plan.individualcareplan.engelli_ikid = 6;
    if (!this.plan.individualcareplan.engelli_ikid) {
      alert("Engelli Seçilmedi!");
      return;
    }
    if (!this.plan.individualcareplan.kurucu_id) {
      alert("Kurucu Müdür Bulunamadı. Lütfen bir Kurucu Müdür Ekleyin!");
      return;
    }

    this.plan.individualcareplan.bmid = this.service.getCareCenterId();
    if (!this.plan.individualcareplan.id) {
      this.insertIndividualCarePlan();
    }
    else {
      this.updateIndividualCarePlan();
    }

  }
  insertIndividualCarePlan() {

    this._workRegistry.insertWorkRecordBook().subscribe(
      res => {
        console.log(res);
        this.plan.individualcareplan._mes_sira_no_id = res.data.id;
        this.plan.individualcareplan.bbp_mesleki_kayit_no_id = res.data.mckdsirano;
        this.plan.individualcareplan.aktif_kayit = true;
        //this.plan.individualcareplan.kurucu_id=0;
        this.service.postWithPostModel<ResModel<IndividualCarePlanPageViewModel>, IndividualCarePlanPageViewModel>("insertIndividualCarePlanPage", this.plan, true).subscribe(
          res => {
            console.log(res);
            if (res.isSuccess) {
              this.showAlert(NotificationTypes.success, "İşlem Başarılı", "Bireysel Bakım Planı Başarı ile Kaydedildi.");
              this.plan.individualcareplan.id = res.data.individualcareplan.id;
              this.getIndividualCarePlanById();
            }
          },
          err => { console.log(err); }
        );
      }
    );

  }
  updateIndividualCarePlan() {
    this.service.postWithPostModel<ResModel<string>, IndividualCarePlanPageViewModel>("updateIndividualCarePlanPage", this.plan, true).subscribe(
      res => {
        console.log(res);
        if (res.isSuccess)
          this.showAlert(NotificationTypes.success, "İşlem Başarılı", "Bireysel Bakım Planı Başarı ile Güncellendi.");
      },
      err => { console.log(err); }
    );
  }
  // Hizmet Bilgileri listesini getirme
  getPersonalCareServices() {
    this.service.postWithPostModel<ResModel<MaintenanceServicesAnalysis[]>, string>("getAllMaintanenceName", null).subscribe(
      res => {
        console.log(res);
        res.data.forEach(element => {
          let analysis: MaintenanceServicesAnalysis = new MaintenanceServicesAnalysis();
          analysis._kisiselbakimadi = element.kbha_adi;
          analysis.hizmetsekli = element.hizmetsekli;
          analysis.kisiselbakimhizadi_id = element.kbha_id;
          analysis.yardimihtiyac = "null";
          analysis.hizmetsikligi = "null";
          this.plan.maintenanceservicesanalysis.push(analysis);
        });
      }
    );
  }
  //psiko sosyal hizmet listesi getirme.
  getAllPsychoSocialServices() {
    this.service.postWithPostModel<ResModel<PsychoSocialAnalysis[]>, string>("getAllPsychoSocialName", null).subscribe(
      res => {
        console.log(res);
        res.data.forEach(element => {
          let e: PsychoSocialAnalysis = new PsychoSocialAnalysis();
          e.psikososdestekhizadi_id = element.id;
          e.psikohizadi = element.psikohizadi;
          this.plan.psychosocialanalysis.push(e);
        });
      }
    );
  }

  public getIndividualCarePlanPageViewModel() {
    this.service.postWithPostModel<ResModel<IndividualCarePlanPageViewModel>, string>("getIndividualCarePlanPageViewModel", null).subscribe(
      res => {
        console.log(res);
        this.plan.individualcareplan = res.data.individualcareplan;
        this.plan.kurucuAdiSoyadi = res.data.kurucuAdiSoyadi;
        this.plan.individualcareplan.duzenlemetar = new Date(Date.now());
      },
      err => {
        console.log(err);
      }
    );
  }
  public getDisablity() {
    this.service.postWithPostModel<ResModel<DisabilityViewModel[]>, number>("getFirstAcceptanceById", this.plan.individualcareplan.engelli_ikid).subscribe(
      res => {
        console.log(res.data[0]);
        this._disability = res.data[0];
        this._disabilityname = res.data[0].ikadisoyadi;

      },
      err => {
        console.log(err);
      }
    );
  }
  //Bakım Hizmetleri analizi modal ---------------------------------------------------
  //Bakım Hizmetleri analizi modal open
  openOndividualCarePlanEvaluation(s: MaintenanceServicesAnalysis): void {
    // if(s.==null){
    //   this.showAlert(NotificationTypes.error,"Hata","Kayıt Yapmadan değerlendirme işlemi yapamazsınız.");
    // }
    this.CareServiceEvaluationModal.show();
    //this.showAlert(NotificationTypes.error,"Hata","Kayıt Yapmadan değerlendirme işlemi yapamazsınız.");
    this._maintenanceServicesEvaluation.bhandeg_bakhizanaliz_id = s.id;
    this._maintenanceServicesEvaluation._service_text = s._kisiselbakimadi;
    this.getMaintenanceServicesEvaluationList(s.id);

  }
  //Bakım Hizmetleri analizi modal hide
  closeOndividualCarePlanEvaluation(): void {
    this.CareServiceEvaluationModal.hide();
  }
  //Bakım Hizmetleri analizi modal save button
  saveMaintenanceServicesEvaluation() {
    this.service.postWithPostModel<ResModel<string>, MaintenanceServicesEvaluation>("insertMaintenanceServiceAnalysisEvaluation", this._maintenanceServicesEvaluation, true).subscribe(
      res => {
        console.log(res);
        this.getMaintenanceServicesEvaluationList(this._maintenanceServicesEvaluation.bhandeg_bakhizanaliz_id);
        this._maintenanceServicesEvaluation.bhandegtarih = null;
        this._maintenanceServicesEvaluation.bhandegdegerlendirme = null;
      },
      err => { err }
    );
  }

  getMaintenanceServicesEvaluationList(id: number) {
    this.service.postWithPostModel<ResModel<MaintenanceServicesEvaluation[]>, number>("getListMaintenanceServiceAnalysisEvaluation", id, true).subscribe(
      res => {
        this._maintenanceServicesEvaluationList = res.data;
        console.log(res);
      },
      err => { err }
    );
  }

  deleteMaintenanceServicesEvaluation(model: MaintenanceServicesEvaluation) {
    this.service.postWithPostModel<ResModel<string>, number>("deleteMaintenanceServiceAnalysisEvaluation", model.bhandegid, true).subscribe(
      res => {
        this.getMaintenanceServicesEvaluationList(model.bhandeg_bakhizanaliz_id);
      },
      err => { err }
    );
  }
  // \Bakım Hizmetleri analizi modal ---------------------------------------------------

  //PsychoSocialAnalysisEvaluation -------------------------------------------------
  openHizmetAnaliziDegerlendirme(model: PsychoSocialAnalysis): void {
    console.log(model);
    // if(model.psikososdestekhizadi_id==null){
    //   this.showAlert(NotificationTypes.error,"Hata","Kayıt Yapmadan değerlendirme işlemi yapamazsınız.");
    // }
    this.modalHizmetAnalizi.show();
    // this.showAlert(NotificationTypes.error,"Hata","Kayıt Yapmadan değerlendirme işlemi yapamazsınız.");
    this._psychoSocialAnalysisEvaluation.psdeshizanaliz_id = model.id;
    this._psychoSocialAnalysisEvaluation._service_text = model._psikososdestekadi;
    this.getPsychoSocialAnalysisEvaluationList(model.id);
    console.log(this._disability);

  }
  closeHizmetAnaliziDegerlendirme(): void {
    this.modalHizmetAnalizi.hide();
  }

  savePsychoSocialAnalysisEvaluation() {
    this.service.postWithPostModel<ResModel<string>, PsychoSocialAnalysisEvaluation>("insertPsychoSocialAnalysisEvaluation", this._psychoSocialAnalysisEvaluation, true).subscribe(
      res => {
        console.log(res);
        this.getPsychoSocialAnalysisEvaluationList(this._psychoSocialAnalysisEvaluation.psdeshizanaliz_id);
        this._psychoSocialAnalysisEvaluation.psandegdegerlendirme = "";
        this._psychoSocialAnalysisEvaluation.psandegtarih = null;

      },
      err => { err }
    );
  }
  getPsychoSocialAnalysisEvaluationList(id: number) {
    this.service.postWithPostModel<ResModel<PsychoSocialAnalysisEvaluation[]>, number>("getListPsychoSocialAnalysisEvaluation", id, true).subscribe(
      res => {
        this._psychoSocialAnalysisEvaluationList = res.data;
        console.log(res);
      },
      err => { err }
    );
  }
  deletePsychoSocialAnalysisEvaluation(model: PsychoSocialAnalysisEvaluation) {
    this.service.postWithPostModel<ResModel<string>, number>("deletePsychoSocialAnalysisEvaluation", model.psandegid, true).subscribe(
      res => {
        this.getPsychoSocialAnalysisEvaluationList(model.psdeshizanaliz_id);
      },
      err => { err }
    );
  }
  //----------------------------------------------------------------------------------

  getDisabledId($event) {
    console.log("Selected disabled id:" + $event);
    this.plan.individualcareplan.engelli_ikid = $event;
  }

  private showAlert(type: NotificationTypes, title: string, body: string) {
    //private toasterService: ToasterService,
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }

}
export class IndividualCarePlanPageViewModel {
  public individualcareplan: IndividualCarePlanModel;
  // Bireysel bakım hizmeti
  public maintenanceservicesanalysis: MaintenanceServicesAnalysis[];
  //Psiko-Sosyal Destek Hizmetleri	
  public psychosocialanalysis: PsychoSocialAnalysis[];
  public kurucuAdiSoyadi: string;
  constructor() {
    this.individualcareplan = new IndividualCarePlanModel();
    this.individualcareplan.engellihiztur = null;
    this.maintenanceservicesanalysis = [];
    this.psychosocialanalysis = [];
  }
}

// Bireysel bakım hizmeti
export class MaintenanceServicesAnalysis {
  public id: number;
  public bireyselplani_id: number;
  public kisiselbakimhizadi_id: number;
  public yardimihtiyac: string;
  public hizmetsikligi: string;
  public hizmetsekli: string;
  public kbha_id: number;
  //views
  public _kisiselbakimadi: string;
  public _evaluationList: PsychoSocialAnalysisEvaluation[] = [];
  public kbha_adi: string;
  constructor() {
    this.yardimihtiyac = null;
    this.hizmetsikligi = null;
  }
}
export class PsychoSocialAnalysis {
  public id: number;
  public bbp_id: number;
  public psikososdestekhizadi_id: number;
  public basyarihtiyacdrm: string;
  public amachedef: string;
  public ongorulencalismalar: string;
  public psandegkayittar: Date;
  public psandeguserid: number;
  public psandegdatetime: Date;
  public psikohizadi: string;
  public evaluationList: MaintenanceServicesEvaluation[];
  public _psikososdestekadi: string;
  constructor() {
    this.basyarihtiyacdrm = null;
  }
}

export class DisabilityViewModel {
  public ikid: number;
  public iktcno: string;
  public ikadisoyadi: string;
  public ikdogtar: Date;
  public ikcinsiyet: string;
  public ikbabaadi: string;
  public engelligrubu: string;
}
// Bakım hizmetleri analizi değerlendirme
export class MaintenanceServicesEvaluation {
  public bhandegid: number;
  public bhandeg_bakhizanaliz_id: number;
  public bhandegtarih: Date;
  public bhandegdegerlendirme: string;
  public bhandegkayittar: Date;
  public bhandeguserid: number;
  public bhandegdatetime: Date;
  public updatedate: Date;
  // Views
  public _service_text: string;
}
// Psiko sosyal  hizmetleri analizi değerlendirme
export class PsychoSocialAnalysisEvaluation {
  public psandegid: number;
  public psdeshizanaliz_id: number;
  public psandegtarih: Date;
  public psandegdegerlendirme: string;
  public psandegkapkayittar: Date;
  public psandeguserid: number;
  public psandegdatetime: Date;
  public updatedate: Date;
  // Views
  public _service_text: string;
  public _useradsoyad: string;
}
