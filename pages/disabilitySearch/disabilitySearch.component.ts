import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { DisabilityViewModel } from '../plans/bireyselBakimPlan/bireyselBakimPlan.component';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { Observable } from 'rxjs';
import { DisabledViewModel } from '../firstAcceptance/firstAcceptance.component';
import { ImageOperationComponent } from '../../components/imageOperation/imageOperation.component';

@Component({
  selector: 'app-disabilitySearch',
  templateUrl: './disabilitySearch.component.html',
  styleUrls: ['./disabilitySearch.component.scss']
})
export class DisabilitySearchComponent implements OnInit {
  public _disabilityname: string = "";
  public _disabilityList: DisabilityViewModel[] = [];
  @Input('disabilityname') disabilityname;
  @Input('disability') disability;
  @Output('getDisabledId') getDisabledId = new EventEmitter();
  @ViewChild('lisansFirst') lisansFirst: ImageOperationComponent;
  constructor(private service: AppServiceService) {
    
  }
  showDropDown: boolean = false;
  toggleDropDown() {
    setTimeout(() => {
      this.showDropDown = !this.showDropDown;
    }, 200);

  }

  ngOnInit() {
    this.disability=new DisabledViewModel();
  }
  onSearchDisability(searchValue: string) {

    if (searchValue.length > 0) {
      this.getDisability();
    }
  }
  selectDisability(value: DisabilityViewModel) {

    if (!value)
      return;
    this.disability = value;
    this._disabilityname = "";
    this.getDisabledId.next(this.disability.ikid);
  }
  public getDisability() {
    this.service.postWithPostModel<ResModel<DisabilityViewModel[]>, string>("getFirstAcceptanceBySearch", this._disabilityname).subscribe(
      res => {
        console.log(res);
       
        this._disabilityList = res.data;
        
      },
      err => {
        console.log(err);
      }
    );
  }
}
