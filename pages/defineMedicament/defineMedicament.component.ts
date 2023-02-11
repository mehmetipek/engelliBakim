import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { ToasterService } from 'angular2-toaster';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { BsLocaleService } from 'ngx-bootstrap';
import { DrugSearchViewModel } from '../../components/searchDrug/searchDrug.component';
import { Medicament } from '../../modules/engelli-ilk-kabul/engelli-Ilac-Rapor/engelli-Ilac-Rapor.component';

@Component({
  selector: 'app-defineMedicament',
  templateUrl: './defineMedicament.component.html',
  styleUrls: ['./defineMedicament.component.css']
})
export class DefineMedicamentComponent implements OnInit {
  public ilacList: Medicament[];
  public ilac: Medicament = new Medicament();
  modalReference: any;
  closeResult: String;
  
  public _drugList: DrugSearchViewModel[] = [];
  showDropDown: boolean = false;
  public toggleDropDown() {
    setTimeout(() => {
      this.showDropDown = !this.showDropDown;
    }, 200);

  }
  public onSearchDrug(searchValue: string) {

    if (searchValue.length > 0) {
      this.searchDrug();
    }
    else
      this._drugList = [];
  }
  public searchDrug() {
    this.service.postWithPostModel<ResModel<DrugSearchViewModel[]>, string>("getListMedicinesByName", this.ilac.ilacadi).subscribe(
      res => {
        console.log(res);
        this._drugList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  constructor(private toasterService: ToasterService, private service: AppServiceService,private localeService: BsLocaleService) {
    
    this.localeService.use('tr');
   }
  ngOnInit() {
  }
  // İlaç insert İşlemi
  public insertIlac() {
    this.service.postWithPostModel<ResModel<Medicament>, Medicament>("insertMedicine", this.ilac, true).subscribe(
      res => {
        console.log(res);
        if (res.isSuccess)
          this.showAlert(NotificationTypes.success, "Başarılı", "İlaç Başarı ile Kaydedildi.");
     else
     this.showAlert(NotificationTypes.error, "Hata", "İlaç Kaydedilirken Bir Hata Oluştu.");

        },
      err => {
        console.log(err);
      }
    );

    this.ilac = new Medicament();
  }
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

  private showAlert(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }
}
