import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';

@Component({
  selector: 'app-disabilityPeriodicExaminationForm',
  templateUrl: './disabilityPeriodicExaminationForm.component.html',
  styleUrls: ['./disabilityPeriodicExaminationForm.component.scss']
})
export class DisabilityPeriodicExaminationFormComponent implements OnInit {

  public _report: DisabilityPeriodicExaminationForm = new DisabilityPeriodicExaminationForm();
  public _reportList: DisabilityPeriodicExaminationForm[] = [];
  public _disablityId: number;

  constructor(private service: AppServiceService) { }

  ngOnInit() {
    if (this._disablityId)
      this.getListDisabilityPeriodicExaminationForm();
  }
  newReport(){
    this._report=new DisabilityPeriodicExaminationForm();
  }

  editReport(report: DisabilityPeriodicExaminationForm) {
    this._report = report;
    this._report.p_muayene_tarihi = new Date(this._report.p_muayene_tarihi);
  }
  saveReport() {
    if (!this._disablityId)
      return alert("Lütfen Önce Bir Engelli Seçiniz..");
    this._report.engelli_id = this._disablityId;
    if (this._report.id)
      this.updateDisabilityPeriodicExaminationForm();
    else
      this.insertDisabilityPeriodicExaminationForm();
  }
  insertDisabilityPeriodicExaminationForm() {
    this.service.postWithPostModel<ResModel<string>, DisabilityPeriodicExaminationForm>("insertDisabilityPeriodicExaminationForm", this._report, true).subscribe(
      res => {
        console.log(res);
        this.getListDisabilityPeriodicExaminationForm();
        this._report = new DisabilityPeriodicExaminationForm
      },
      err => { console.log(err); }
    );
  }
  updateDisabilityPeriodicExaminationForm() {
    this.service.postWithPostModel<ResModel<DisabilityPeriodicExaminationForm>, DisabilityPeriodicExaminationForm>("updateDisabilityPeriodicExaminationForm", this._report, true).subscribe(
      res => {
        console.log(res);
        this.getListDisabilityPeriodicExaminationForm();
      },
      err => { console.log(err); }
    );
  }
  closeDisabilityPeriodicExaminationForm() {
    if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
      this.service.postWithPostModel<ResModel<string>, number>("closeDisabilityPeriodicExaminationForm", this._report.id).subscribe(
        res => { console.log(res); this.getListDisabilityPeriodicExaminationForm(); },
        err => { console.log(err); }
      );
  }
  getListDisabilityPeriodicExaminationForm() {
    this.service.postWithPostModel<ResModel<DisabilityPeriodicExaminationForm[]>, number>("getListDisabilityPeriodicExaminationForm", this._disablityId, true).subscribe(
      res => {
        console.log(res);
        this._reportList = res.data;
        this._report = new DisabilityPeriodicExaminationForm();
      },
      err => { console.log(err); }
    );
  }
  getDisabledId($event) {
    console.log("Selected disabled id:" + $event);
    this._disablityId = $event;
    this.getListDisabilityPeriodicExaminationForm();
  }
}
export class DisabilityPeriodicExaminationForm {
  public id: number;
  public engelli_id: number;
  public p_muayene_tarihi: Date;
  public p_kontrol: string;
  public bm_id: number;
  public aktif: boolean;
  public kapali_kayit_tarihi: Date;
  public user_id: number;
  public datetime: Date;
  public updatedate: Date;
  public _username: string;
  public sonraki_muayene_ay: number;
  public sonraki_muayene_yil: number;



}