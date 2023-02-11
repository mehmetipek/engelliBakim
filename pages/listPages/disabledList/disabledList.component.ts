import { Component, OnInit } from '@angular/core';
import { Disabled } from '../../../models/Disabled';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';
import { BsLocaleService } from 'ngx-bootstrap';
import { NotificationTypes } from '../../../enums/notificationTypes.enum';
import { ToasterService } from 'angular2-toaster';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-disabledList',
  templateUrl: './disabledList.component.html',
  styleUrls: ['./disabledList.component.scss']
})
export class DisabledListComponent implements OnInit {
  public _disabledList: Disabled[];
  public engelli: Disabled =new Disabled();
  public filter: ListFilter = new ListFilter();
  public tuttiid:number;
  public _photoUrl = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  constructor(private service: AppServiceService,
    private toasterService: ToasterService,
    private localeService: BsLocaleService,
    private http: HttpClient) {
    this.localeService.use('tr');
   }
   public _searchText: string = "";
  ngOnInit() {
    this.filter.kayitaktif = true;
    this.getDisabledListFilter();
  }
  
  getFilterByName(s) {
    this.filter.ikengelligrubu = s;
    this.getDisabledListFilter();
  }
  getFilterByCins(s){
    this.filter.ikcinsiyet=s;
    this.getDisabledListFilter();
  }
  getFilterBySigara(s){
    this.filter.iksigarakul=s;
    this.getDisabledListFilter();
  }
  public getDisabledListFilter() {
    let url: string = "getSearchFirstAcceptance";
    console.log(this.filter);
    if (this.filter.ikengelligrubu=="null") 
    this.filter.ikengelligrubu=null;
    if (this.filter.ikcinsiyet=="null") 
    this.filter.ikcinsiyet=null;
    if(this.filter.iksigarakul=="null")
    this.filter.iksigarakul=null;
    this.service.postWithPostModel<ResModel<Disabled[]>, ListFilter>(url,this.filter).subscribe(
        res => {
          console.log(res);
          this._disabledList= res.data;
          
        },
        err => {
          console.log(err);
        }
      );
  }
  /*
  public getFirstAcceptance() {
    console.log("getFirstAcceptance");
    this.service.postWithPostModel<ResModel<Disabled[]>, string>("getFirstAcceptance", this._disabled.iktcno).subscribe(
      res => {
        if (!res.data[0])
          return this.showAlert(NotificationTypes.error, "Engelli Bulunamadı", "Engelli getirilirken bir hata oluştu!");

        console.log(res);
        this._disabled = res.data[0];
        this._disabled.ikdogtar = new Date(res.data[0].ikdogtar);
        this._disabled.ikaspimonaytar= new Date(res.data[0].ikaspimonaytar);
        this._disabled.ikkabultarihi= new Date(res.data[0].ikkabultarihi);
    
      },
      err => {
        console.log(err);
      }
    );
  }*/
  public getDisablee(id: number) {
    console.log(id);
    console.log("getFirstAcceptance");
    this.tuttiid=id;
    if (id)
    this.service.postWithPostModel<ResModel<Disabled>, number>("getFirstAcceptance",id,true)
        .subscribe(
          res => {
            console.log(res);
            if (!res.isSuccess)
              return this.showAlert(NotificationTypes.error,"Kayıt Bulunamadı","Bu TC ye kayıtlı bir engelli bulunmamaktadır!");

            if (!res.data) {
              this.showAlert(NotificationTypes.error,"Kayıt Bulunamadı","Bu TC ye kayıtlı bir engelli bulunmamaktadır!");
              return;
            }
            else {
             this.engelli=res.data[0];
              
            if(res.data[0].ikkabultarihi)
              this.engelli.ikkabultarihi = new Date(res.data[0].ikkabultarihi); 
            if(res.data[0].ikaspimonaytar)
              this.engelli.ikaspimonaytar= new Date(res.data[0].ikaspimonaytar);
              this.engelli.ikkabultarihi=null;
              this.engelli.ikaspimonayno=null;
              this.engelli.ikaspimonaytar=null;
             // this.mudurPersonel = res.data.employee;
              this.showAlert(NotificationTypes.info,"Başarılı","Engelli Başarı ile Geldi");
            }
          },
          err => {
            console.log("Kullanıcı Çekilirken hata oluştu");
          }
        );
    }
    public reLoginDisablee() {
      this.engelli.ikbmid = this.service.getCareCenterId();
      this.engelli.ikid=this.tuttiid;
      this.service.postWithPostModel<ResModel<Disabled>,Disabled>("reLoginFirst", this.engelli, true).subscribe(
        res => {
          console.log(res);
          this.getDisabledListFilter();
          this.showAlert(NotificationTypes.success,"Başarılı","Engelli tekrar aktif hale gelmiştir.");
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
  public _ikadi:string;
	public ikengelligrubu:string;
	public iksigarakul:string;
	public ikcinsiyet:string;
  public ikkabultarihibas:Date;
  public ikkabultarihibit:Date;
  public ikayrilistarbas:Date;
  public ikayrilistarbit:Date;

	public kayitaktif:boolean;
	public kioskModeEnabled:boolean;
  constructor(){
    this.ikengelligrubu=null;
    this.ikcinsiyet=null;
    this.kioskModeEnabled=false;
    this.iksigarakul=null;
  }
}

