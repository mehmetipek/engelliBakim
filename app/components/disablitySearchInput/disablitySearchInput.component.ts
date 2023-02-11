import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { DisabilityViewModel } from '../../pages/plans/bireyselBakimPlan/bireyselBakimPlan.component';

@Component({
  selector: 'app-disablitySearchInput',
  templateUrl: './disablitySearchInput.component.html',
  styleUrls: ['./disablitySearchInput.component.scss']
})
export class DisablitySearchInputComponent implements OnInit {
  public _disablitiyname: string = "";
  public _disablitiyList: DisabilityViewModel[] = [];
  @Input('Disablitiyname') Disablitiyname;
  @Input('Disablitiy') Disablitiy;
  @Output('getDisablitiyId') getDisablitiyId = new EventEmitter();
  @Output('getDisablitiy') setDisablitiy = new EventEmitter();
  constructor(private service: AppServiceService) { }

  ngOnInit() {
  }
  showDropDown: boolean = false;
  public toggleDropDown() {
    setTimeout(() => {
      this.showDropDown = !this.showDropDown;
    }, 200);

  }
  public onSearchDisablitiy(searchValue: string) {

    if (searchValue.length > 0) {
      this.searchDisablitiy();
    }
    else
      this._disablitiyList = [];
  }
  public selectDisablitiy(value: DisablitiySearchViewModel) {

    if (!value)
      return;
    console.log(value);
    setTimeout(() => {
      this.setDisablitiy.next(this.Disablitiy);
    }, 200);
    this.Disablitiy = value;
    // this._disablitiyname = value.peradi+" "+value.persoyadi;
    // this.getDisablitiyId.next(this.Disablitiy.perid);

  }
  public searchDisablitiy() {
    this.service.postWithPostModel<ResModel<DisabilityViewModel[]>, string>("getFirstAcceptanceBySearch", this._disablitiyname).subscribe(
      res => {
        console.log(res);
        this._disablitiyList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public selectedItem(newObj) {
    console.log("modelChanged");
    console.log(newObj);
  }
}
export class DisablitiySearchViewModel {
  public perid: number;
  public pertcno: string;
  public peradi: string;
  public persoyadi: string;
}