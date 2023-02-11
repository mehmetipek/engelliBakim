import { Component, OnInit } from "@angular/core";
import { Employee } from "../../../models/Employee";
import { AppServiceService } from "../../../services/appService.service";
import { ResModel } from "../../../models/resModel";
import { EmployeeViewModel } from "../../../models/EmployeeViewModel";
import { NotificationTypes } from "../../../enums/notificationTypes.enum";
import { ToasterService } from "angular2-toaster";
import { BsLocaleService } from "ngx-bootstrap";
import { filter } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: "app-employeeList",
  templateUrl: "./employeeList.component.html",
  styleUrls: ["./employeeList.component.scss"]
})
export class EmployeeListComponent implements OnInit {
  public _employeeList: Employee[];
  public _photoUrl = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  public mudurPersonel: Employee = new Employee();
  public filter: ListFilter = new ListFilter();
  public tuttiid:number;
  constructor(
    private service: AppServiceService,
    private toasterService: ToasterService,
    private localeService: BsLocaleService,
    private http: HttpClient
  ) {
    this.localeService.use("tr");
  }
  public _searchText: string = "";
  ngOnInit() {
    this.filter.kayitaktif = true;
    this.getEmployeeListByFilter();
  }

  getFilterByStaff(s) {
    this.filter.kadro = s;
    this.getEmployeeListByFilter();
  }
  getFilterByCins(s) {
    this.filter.cinsiyet = s;
    this.getEmployeeListByFilter();
  }
  getFilterByPer(s) {
    this.filter.persigarakul = s;
    this.getEmployeeListByFilter();
  }
  public getEmployeeListByFilter() {
    let url: string = "getFilter";
    console.log(this.filter);
    if (this.filter.kadro == "null") this.filter.kadro = null;
    if (this.filter.cinsiyet == "null") this.filter.cinsiyet = null;
    if (this.filter.persigarakul == "null") this.filter.persigarakul = null;

    this.service
      .postWithPostModel<ResModel<Employee[]>, ListFilter>(
        url,
        this.filter
      )
      .subscribe(
        res => {
          console.log(res);
          this._employeeList = res.data;
        },
        err => {
          console.log(err);
        }
      );
  }
  public getEmployee(id: number) {
    console.log(id);
    console.log("getEmployee");
    this.tuttiid=id;
    if (id)
      this.service
        .postWithPostModel<ResModel<EmployeeViewModel>, number>("getEmployee",id,true)
        .subscribe(
          res => {
            console.log(res);
            if (!res.isSuccess)
              return this.showAlert(NotificationTypes.error,"Kayıt Bulunamadı","Bu TC ye kayıtlı bir personel bulunmamaktadır!");

              
            if (!res.data.employee) {
              this.showAlert(
                NotificationTypes.error,
                "Kayıt Bulunamadı",
                "Bu TC ye kayıtlı bir personel bulunmamaktadır!"
              );
              return;
            } else {
              this.mudurPersonel = res.data.employee;
              if(res.data.employee.pergiristar)
              this.mudurPersonel.pergiristar = new Date(res.data.employee.pergiristar); 
            if(res.data.employee.pergiraspimonaytar)
              this.mudurPersonel.pergiraspimonaytar = new Date(res.data.employee.pergiraspimonaytar);
             // this.mudurPersonel = res.data.employee;
             this.mudurPersonel.pergiraspimonayno=null;
             this.mudurPersonel.pergiraspimonaytar=null;
             this.mudurPersonel.pergiristar=null;
             
              this.showAlert(
                NotificationTypes.info,
                "Başarılı",
                "Personel Başarı ile Geldi"
              );
            }
          },
          err => {
            console.log("Kullanıcı Çekilirken hata oluştu");
          }
        );
}
  public reLoginEmployee() {
    this.mudurPersonel.perbmid = this.service.getCareCenterId();
    this.mudurPersonel.perid=this.tuttiid;
    this.service.postWithPostModel<ResModel<Employee>, Employee>("reLogin", this.mudurPersonel, true).subscribe(
      res => {
        console.log(res);
        this.getEmployeeListByFilter();
      },
      err => {
        console.log(err);
      }
    );
  }
/*
  public setActive(e: Employee) {
    this.service.postWithPostModel<ResModel<boolean>, number>("empoloyeeSetActive",e.perid)
      .subscribe(
        res => {
          console.log(res);
          this.getEmployeeListByFilter();
        },
        err => {
          console.log(err);
        }
      );
  }*/
  public searchEmployeList(text) {
    console.log(text);
    if (text != "")
      this.service
        .postWithPostModel<ResModel<Employee[]>, string>(
          "getAllEmployeeByName",
          text
        )
        .subscribe(
          res => {
            console.log(res);
            this._employeeList = res.data;
          },
          err => {
            console.log(err);
          }
        );
  }
  private showAlert(type: NotificationTypes, title: string, body: string) {
    this.toasterService.popAsync(this.service.getToast(type, title, body));
  }
}
export class ListFilter {
  public _name:string;
  public kadro:string;
  public kayitaktif:boolean;
  public cinsiyet:string;
  public persigarakul:string;

  constructor(){
    this.kadro=null;
    this.cinsiyet=null;
    this.persigarakul=null;
  }
}
