import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Employee } from '../../models/Employee';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';

@Component({
  selector: 'app-searchEmployee',
  templateUrl: './searchEmployee.component.html',
  styleUrls: ['./searchEmployee.component.scss']
})
export class SearchEmployeeComponent implements OnInit {
  public _employeename: string = "";
  public _employeeList: EmployeeSearchViewModel[] = [];
  public _employee:EmployeeSearchViewModel = new EmployeeSearchViewModel();
  @Input('_employeename') Employeename;
  @Input('Employee') Employee;
  @Output('getEmployeeId') getEmployeeId = new EventEmitter();
  @Output('getEmployee') setEmployee = new EventEmitter();
  constructor(private service: AppServiceService) { }

  ngOnInit() {
  }
  showDropDown: boolean = false;
  toggleDropDown() {
    setTimeout(() => {
      this.showDropDown = !this.showDropDown;
    }, 200);

  }
  onSearchEmployee(searchValue: string) {

    if (searchValue.length > 0) {
      this.searchEmployee();
    }
    else
      this._employeeList = [];
  }
  selectEmployee(value: EmployeeSearchViewModel) {
    if (!value)
      return;
    console.log(value);
    setTimeout(() => {
      this.setEmployee.next(this.Employee);
    }, 200);
    this.Employee = value;
    this._employeename = value.peradi+" "+value.persoyadi;
    this.getEmployeeId.next(this.Employee.perid);
    

  }
  public searchEmployee() {
    let model:EmployeeForSearchViewModel=new EmployeeForSearchViewModel();
    model.adsoyad=this._employeename;
    this.service.postWithPostModel<ResModel<EmployeeSearchViewModel[]>, EmployeeForSearchViewModel>("EmployeeSearch", model).subscribe(
      res => {
        console.log(res);
        this._employeeList = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
export class EmployeeSearchViewModel {
  public perid: number;
  public pertcno: string;
  public peradi: string;
  public persoyadi: string;
}
export class EmployeeForSearchViewModel{
  public perkadro:string;
  public adsoyad:string;
}