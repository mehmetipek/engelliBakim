import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppServiceService } from '../../../services/appService.service';
import { DataOperations } from '../../../enums/DataOperations.enum';
import { ResModel } from '../../../models/resModel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageOperationComponent } from '../../../components/imageOperation/imageOperation.component';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-engelli-Ilac-Rapor',
  templateUrl: './engelli-Ilac-Rapor.component.html',
  styleUrls: ['./engelli-Ilac-Rapor.component.scss']
})
export class EngelliIlacRaporComponent implements OnInit {
  @Input() ikid: number;
  // İlaç raporunda ilaçlerın otomatik tamamlama özelliği için kullanılan değişken..
  showDropDown: boolean = false;



  // İlaç Arama için gerekli olan ilaç listesi
  public _medicamentList: MedicamentReport[];

  //Ekrandaki tablodaki raporların listesi
  public _medicamentReportList: MedicamentReport[] = [];
  @ViewChild('engelliIlacRapor') public engelliIlacRapor: ModalDirective;

  @ViewChild('lisansIlac') lisansIlac: ImageOperationComponent;

  closeResult: String;
  modalReference: any;
  public _medicamentReport_operation: DataOperations;
  public _photoMedicamentReport: File;
  public _txtMedicament: string;

  public report: MedicamentReportViewModel = new MedicamentReportViewModel();
  constructor(private service: AppServiceService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  // MedicamentReport ---------------------------------------------------------------
  //İlaç raporu modal açma
  public newMedicamentReport() {
    //  if (this.ikid<0) {
    //    alert("Lütfen Önce İlk Kayıdı Kaydediniz..");
    //    return;
    //  }
    this.report.medicamentReport = new MedicamentReport();
    this.report.medicamentList = [];
    this._medicamentReport_operation = DataOperations.create;
    //this.lisansIlac.photoSrc="";

  }
  public editMedicamentReport(report: MedicamentReport) {

    this.report.medicamentReport = report;
    this.getMedicinesByReportId(report.id); // Rapordaki ilaçların listesini getiriyor..    
    this._medicamentReport_operation = DataOperations.edit;
    if(this.report.medicamentReport.raportarihi)
    this.report.medicamentReport.raportarihi = new Date(this.report.medicamentReport.raportarihi);
    if(this.report.medicamentReport.raporbitistarihi)
    this.report.medicamentReport.raporbitistarihi = new Date(this.report.medicamentReport.raporbitistarihi);
    //this.getPhoto_medicamentReport(report.id);
  }
  
  public getMedicinesByReportId(id: number) {
    this.service.postWithPostModel<ResModel<ReportMedicine[]>, number>("getMedicinesByReportId", id, true).subscribe(
      res => {
        console.log(res);
        this.report.medicamentList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public getList(disabltyId: number) {
    
    this.ikid = disabltyId;
    console.log("getListDisabilityMedicineReport");
    this.service.postWithPostModel<ResModel<MedicamentReport[]>, number>("getListDisabilityMedicineReport", disabltyId).subscribe(
      res => {
        console.log(res);
        this._medicamentReportList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  //Modal içerisindeki kaydet butonu
  public saveMedicamentReport() {
    console.log("saveMedicamentReport()");
    this.report.medicamentReport.rap_ikid = this.ikid;
    if (!this.report.medicamentReport.id) {
      this.report.medicamentReport.raporaktif = true;
     // this.insertMedicamentReport();
    }
    if(this.report.medicamentReport.id>0){
      this.engelliIlacRapor.hide();
    }
    console.log(this.report);
    this.service.postWithPostModel<ResModel<MedicamentReportViewModel>, MedicamentReportViewModel>("saveDrugList", this.report, true).subscribe(
      res => {
        console.log(res);
        this.report=res.data;
        this.getMedicinesByReportId(this.report.medicamentReport.id); 
        if(this.report.medicamentReport.raportarihi)
        this.report.medicamentReport.raportarihi = new Date(this.report.medicamentReport.raportarihi);
        if(this.report.medicamentReport.raporbitistarihi)
        this.report.medicamentReport.raporbitistarihi = new Date(this.report.medicamentReport.raporbitistarihi);
        this.getList(this.ikid);
        
        //this.savePhoto_medicamentReport(res.data.medicamentReport.id);
      },
      err => {
        console.log(err);
      }
    );
  }
  // public insertMedicamentReport() {
  //   let report: MedicamentReportViewModel = new MedicamentReportViewModel();
  //   report.medicamentReport = this.report.medicamentReport;
  //   report.medicamentReport.rap_ikid = this.ikid;
  //   report.medicamentList = this.medicamentlist;
  //   this.service.postWithPostModel<ResModel<number>, MedicamentReportViewModel>("insertDisabilityMedicationReport", report, true).subscribe(
  //     res => {
  //       console.log(res);
  //       this.savePhoto_medicamentReport(res.data);
  //       this.getList(this.ikid);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  // public updateMedicamentReport() {

  //   let report: MedicamentReportViewModel = new MedicamentReportViewModel();
  //   report.medicamentReport = this._medicamentReport;
  //   report.medicamentReport.rap_ikid = this.ikid;
  //   report.medicamentList = this.medicamentlist;
  //   this.service.postWithPostModel<ResModel<number>, MedicamentReportViewModel>("saveDisabilityMedicationReport", report, true).subscribe(
  //     res => {
  //       console.log(res);
  //       this.getList(this.ikid);

  //       this.savePhoto_medicamentReport(res.data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
  public closeMedicamentReport() {
    if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
      this.service.postWithPostModel<ResModel<string>, number>("closeDisabilityMedicineReport", this.report.medicamentReport.id, true).subscribe(
        res => {
          console.log(res);
          this.getList(this.ikid);
          this.report.medicamentReport = new MedicamentReport();
          this._medicamentList = [];
        },
        err => {
          console.log(err);
        }
      );
  }
  addMedicationtoReport(value: ReportMedicine) {
    console.log("addMedicationtoReport()");
    this.service.postWithPostModel<ResModel<string>, ReportMedicine>("saveDrugList", value, true).subscribe(
      res => {
        console.log(res);
        this.getMedicinesByReportId(value.rapor_id);
        this.engelliIlacRapor.hide();
      },
      err => {
        console.log(err);
      }
    );
  }
  // ilaç listesindeki Seç butonuSeçilen ilacın listeye ve tabloya eklenmesi
  public selectMedicament(value: Medicament) {
    //console.log("selectMedicament");
    let _mdc: ReportMedicine = new ReportMedicine();
    _mdc.ilac_dozu = null;
    _mdc.ilaclis_ilacid = value.ilacid;
    _mdc.ilaclis_ikid = this.ikid;
    _mdc.ilacadi = value.ilacadi;
    _mdc.ilacambsekli = value.ilacambsekli;
    _mdc.rapor_id = this.report.medicamentReport.id;
    // if (this.report.medicamentReport_operation == DataOperations.create)
    this.report.medicamentList.push(_mdc);
    this._txtMedicament = "";
    // else {
    //   let m: ReportMedicine = new ReportMedicine();
    //   m.engelliadi = this.engelli.ikadi + " " + this.engelli.iksoyadi;
    //   m.engellitc = this.engelli.iktcno;
    //   m.ilacid = value.ilacid;
    //   m.raporid = this._medicamentReport.id;
    //   this.addMedicationtoReport(m);
    // }
  }
  // Kayıtlı Rapora ilaç ekleme metodu
  public saveMedicament(medicament: ReportMedicine, raporid: number) {
    console.log("saveMedicament");
    
    let reportmedicine = new ReportMedicine();
    reportmedicine.ilaclis_ilacid = medicament.ilaclis_ilacid;
    reportmedicine.rapor_id = raporid;
    console.log(reportmedicine);
    this.service.postWithPostModel<ResModel<number>, ReportMedicine>("insertReportMedicine", reportmedicine, true).subscribe(
      res => {

        console.log(res);
        this.report.medicamentList.push(medicament);
        this._txtMedicament = "";
      },
      err => {
        console.log(err);
      }
    );

  }
  public onSearchMedicament(searchValue: string) {
    if (searchValue.length > 0) {
      this.getMedicament();
    }
  }
  public getMedicament() {
    this.service.postWithPostModel<ResModel<MedicamentReport[]>, string>("getListMedicinesByName", this._txtMedicament, true).subscribe(
      res => {
        console.log("getMedicament()")
        console.log(res);
        this._medicamentList = res.data;
      },
      err => {
        console.log(err);
      }
    );


  }
  public removeMedicament(medicament: ReportMedicine) {
    if (medicament.id > 0)
      this.service.postWithPostModel<ResModel<string>, number>("deleteDisabilityDrug", medicament.id).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    let index = this.report.medicamentList.findIndex(d => d == medicament);
    if (index == this.report.medicamentList.length)
      this.report.medicamentList.slice(index, 0);
    else
      this.report.medicamentList.splice(index, 1);
  }
  toggleDropDown() {
    setTimeout(() => {
      this.showDropDown = !this.showDropDown;
    }, 200);

  }

  // getPhoto_medicamentReport(id) {
  //   this.service.getPhoto("getDMedReportPhoto", id).subscribe(
  //     res => {
  //       console.log(res);

  //       this.report.medicamentReport._reportimage = "data:image/png;base64," + res.data;
  //     },
  //     err => { console.log(err); }
  //   );
  // }
  //İlaç raporu
  // savePhoto_medicamentReport(id) {
  //   if (!this._photoMedicamentReport)
  //     return;
  //   const fd = new FormData();
  //   fd.append('foto', this._photoMedicamentReport);
  //   fd.append('id', id);
  //   this.service.post<any>("dMedReportPhotoInsert", fd, true).subscribe(
  //     res => { console.log(res); },
  //     err => { console.log(err); }
  //   );
  // }
  // public onFileSelected_medicamentReport(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); 
  //     this._photoMedicamentReport = event.target.files[0];
  //     reader.onload = (event) => {
  //       this.report.medicamentReport._reportimage = reader.result.toString();
        
  //     }
  //   }
  // }
}
// Engelli İlaç Raporu
export class MedicamentReport {
  public id: number;
  public rap_ikid: number;
  public duzenleyenkurum: string;
  public raportarihi: Date;
  public raporno: string;
  public raporgecerlilikdurumu: string;
  public raporbitistarihi: Date;
  public raporaktif: boolean;
  public datetime: Date;
  public updatedate: Date;
  public _reportimage: string;
  constructor(){
    this.raporgecerlilikdurumu=null;
  }
}
export class MedicamentReportViewModel {
  constructor(){
    this.medicamentReport=new MedicamentReport();
  }
  public medicamentReport: MedicamentReport;
  public medicamentList: ReportMedicine[];
}

//İlaç Raporu içerisindeki ilaç
export class ReportMedicine {
  public id: number;
  public rapor_id: number;
  public ilaclis_ilacid: number;
  public ilaclis_ikid: number;
  public updatedate: Date;
  public ilac_dozu: string;

  // views
  public ilacadi: string;
  public ilacambsekli: string;
}
export class Medicament {
  public id: number;
  public ilacid: number;
  public ilacadi: string;
  public ilacambsekli: string;
  public ilacambbasdozsayisi: string;
  constructor() {
    this.ilacambsekli = null;
  }
}