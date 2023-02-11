import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "../../services/appService.service";
import { ResModel } from "../../models/resModel";
import {
  NgbModal,
  ModalDismissReasons
} from "../../../../node_modules/@ng-bootstrap/ng-bootstrap";
import { Medicament } from "../../modules/engelli-ilk-kabul/engelli-Ilac-Rapor/engelli-Ilac-Rapor.component";

@Component({
  selector: "app-medicament",
  templateUrl: "./medicament.component.html",
  styleUrls: ["./medicament.component.css"]
})
export class MedicamentComponent implements OnInit {
  public ilacList: Medicament[];
  public ilac: Medicament = new Medicament();
  modalReference: any;
  closeResult: String;
  constructor(
    private service: AppServiceService
  ) { }

  ngOnInit() {
    this.getIlac();
  }
  //İlaç Listesini getir.
  public getIlac() {
    this.service
      .postWithPostModel<ResModel<Medicament[]>, number>("getListAllMedicines", this.service.getCareCenterId())
      .subscribe(
        rest => {
          this.ilacList = rest.data;
          console.log(rest);
        },
        err => {
          console.log(err);
        }
      );
  }

  // İlaç Güncelleme İşlemi
  public updateIlac() {
    this.service
      .postWithPostModel<ResModel<Medicament>, Medicament>("updateMedicine", this.ilac).subscribe(
        rest => {
          this.ilac = rest.data;
          console.log(rest);
        },
        err => {
          console.log(err);
        }
      );
  }
  public editMedicines(ilac: Medicament) {
    this.ilac = ilac;
  }

  // İlaç insert İşlemi
  public insertIlac() {
    if (this.ilac.ilacid == null) {
      this.service.postWithPostModel<ResModel<Medicament>, Medicament>("insertMedicine", this.ilac, true).subscribe(
        rest => {
          console.log(rest);
          this.getIlac();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.updateIlac();
    }
    this.ilac = new Medicament();
  }
  public deleteIlac(ilac: Medicament) {

    if (confirm("Kaydı Silmek İstediğinize Emin misiniz?"))
      this.service.postWithPostModel<ResModel<String>, number>("deleteMedicine", ilac.ilacid, true).subscribe(
        rest => {
          console.log(rest);

          if (!rest.isSuccess)
            return alert("İlaç Silme İşlemi Başarısız. Bu İlacı Başka Bir Yerde Kullanıyor Olabilirsiniz!");
          this.getIlac();
        },
        err => {
          console.log(err);
        }
      );
  }
  // this.ilac = new Medicament();

  //Rakam sınırlama
  public validate(evt) {
    if (evt.keyCode != 8) {
      let theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      console.log(key);
      let regex = /[0-9]|\./;
      if (key == ".") {
        theEvent.returnValue = false;

        if (theEvent.preventDefault)
          theEvent.preventDefault();
      }
      if (!regex.test(key)) {
        theEvent.returnValue = false;

        if (theEvent.preventDefault)
          theEvent.preventDefault();
      }

    }
  }
}
