import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { DisabilityViewModel } from '../../pages/plans/bireyselBakimPlan/bireyselBakimPlan.component';


@Component({
  selector: 'app-disablitySearchWithTypeHead',
  templateUrl: './disablitySearchWithTypeHead.component.html',
  styleUrls: ['./disablitySearchWithTypeHead.component.scss']
})
export class DisablitySearchWithTypeHeadComponent implements OnInit {

  public model="";
  public _disablitiyList: DisablitiySearchViewModel[] = [];
  formatter = (result: DisablitiySearchViewModel) => result.ikadisoyadi;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this._disablitiyList.filter(v => v.ikadisoyadi.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  @Input('Disablitiyname') Disablitiyname;
  @Input('Disablitiy') Disablitiy;
  @Output('getDisablitiyId') getDisablitiyId = new EventEmitter();
  @Output('setDisablitiy') setDisablitiy = new EventEmitter();

  constructor(private service: AppServiceService) {
    this.searchDisablitiy();
  }
  public searchDisablitiy() {
    this.service.postWithPostModel<ResModel<DisablitiySearchViewModel[]>, string>("getFirstAcceptanceBySearch", "").subscribe(
      res => {
        console.log(res);
        this._disablitiyList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }
  public selectedItem(newObj) {
    console.log("modelChanged");
    // console.log(newObj);
    let m:DisabilityViewModel=newObj.item; 
    this.setDisablitiy.next(newObj.item);
    this.getDisablitiyId.next(m.ikid);
  }

}
export class DisablitiySearchViewModel {
  public ikid: number;
  public iktcno: string;
  public ikadisoyadi: string;
  public engelligrubu: string;
}