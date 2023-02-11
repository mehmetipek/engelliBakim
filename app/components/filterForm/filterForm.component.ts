import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';

@Component({
  selector: 'app-filterForm',
  templateUrl: './filterForm.component.html',
  styleUrls: ['./filterForm.component.scss']
})
export class FilterFormComponent implements OnInit {
  public filter: Filter = new Filter();
  @Output('getFilter') getFilter = new EventEmitter();
  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.filterApply();
  }
  filterApply() {
    this.service.postWithPostModel<ResModel<any>, Filter>("filter", this.filter, true).subscribe(
      res => {
        console.log("filterAppy:");
        console.log(res);
        this.getFilter.next(res);
      },
      err => { console.log(err); }
    );
  }
  getDisablitiyId(id) {
    this.filter.disabilityId = id;
    this.filterApply();
    this.modelChange();
  }
  modelChange() {
    this.getFilter.next(this.filter);
    // console.log(this.filter);
  }
}
export class Filter {
  public disabilityId: number;
  public beginDate: Date;
  public endDate: Date;
  public dayoff_type: string;
  public dayoff_status: string;


}