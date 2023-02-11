import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';

@Component({
  selector: 'app-searchDrug',
  templateUrl: './searchDrug.component.html',
  styleUrls: ['./searchDrug.component.scss']
})
export class SearchDrugComponent implements OnInit {
  @Input('Drugname') Drugname;
  @Input('_drugname') _drugname;
  public _drugList: DrugSearchViewModel[] = [];
  @Input('Drug') Drug
  @Output('getDrugId') getDrugId = new EventEmitter();
  @Output('getDrug') setDrug = new EventEmitter();
  
  constructor(private service: AppServiceService) { }

  ngOnInit() {
  }
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
  selectDrug(value: DrugSearchViewModel) {

    if (!value)
      return;
    console.log(value);
    setTimeout(() => {
      this.setDrug.next(this.Drug);
    }, 200);
    this.Drug = value;
    this._drugname = value.ilacadi;
    // this.getDrugId.next(this.Drug.perid);

  }
  public searchDrug() {
    this.service.postWithPostModel<ResModel<DrugSearchViewModel[]>, string>("getListMedicinesByName", this._drugname).subscribe(
      res => {
        console.log(res);
        this._drugList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
 
}
export class DrugSearchViewModel {
  public ilacid: number;
  public ilacambsekli: string;
  public ilacadi: string;
}