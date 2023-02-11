import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, County } from '../models/CityCounty';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { taxOffice } from '../pages/careCenter/careCenter.component';
import { ResModel } from '../models/resModel';
import { Employee } from '../models/Employee';
import { PostModel } from '../models/postModel';
import { Job } from '../models/job';
import { UserViewModel, UserAuthorizations } from '../models/userViewModel';
import { ToasterConfig, Toast, BodyOutputType, ToasterService } from 'angular2-toaster';
import { NotificationTypes } from '../enums/notificationTypes.enum';
import 'style-loader!angular2-toaster/toaster.css';
import { ResponseType, ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  //public url: string = "http://api.engellibakim.org/";
  public url: string = "http://localhost:80/engellibakimv2/";
  //public url: string = "http://192.168.1.84:80/engellibakimv2/";
  //public url: string = "http://ekamem.eu-west-1.elasticbeanstalk.com/";
    //public url: string = "http://ekamem.eu-west-1.elasticbeanstalk.com/";
  public defaultImage = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
  public defaultLoadingGif = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";
  public userview: UserViewModel;
  public image_tick: number = 0;
  token: string = "";

  private _cityList: City[];
  constructor(private http: HttpClient, private _cookieService: CookieService, private toasterService: ToasterService) {
    this.userview = new UserViewModel();
    // this.getCity().subscribe(
    //   res => {
    //     this._cityList = res.data;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  public basepost(_url, _data): any {

    let xheaders: HttpHeaders = new HttpHeaders();
    xheaders.append('Content-Type', 'application/json; charset=utf-8');

    var a = this.http.post(_url, _data, { headers: xheaders }).subscribe(
      res => {
        console.log(res);
        return res;
      },
      err => {
        console.log("Error!");
      }
    );
    console.log(a);
  }
  public post<T>(_url, _data, writeData?: boolean): Observable<T> {

    if (writeData) {
      console.log("post data: \n");
      console.log(_data);
    }
    let xheaders: HttpHeaders = new HttpHeaders();
    xheaders.append('Content-Type', 'application/json;');
    return this.http.post<T>(this.url + _url, _data, { headers: xheaders });
  }
  public getPhoto(url: string, id: number): Observable<ResModel<string>> {
    let xheaders: HttpHeaders = new HttpHeaders();
    xheaders.append('Content-Type', 'application/text;');
    return this.http.post<ResModel<string>>(this.url + url + "?id=" + id, null,
      {
        headers: xheaders
      });
  }

  public postWithPostModel<resType, postType>(_url, _data: postType, writeData?: boolean): Observable<resType> {
    if (this.token == "")
    console.log("token is empty");
    console.log(this.token);
    
    let model: PostModel<postType> = new PostModel<postType>(this.getToken());
    model.bmId = this.getCareCenterId();
    model.userId = this.getUserId();
    model.data = _data;
    if (writeData) {
      console.log("postWithPostModel data: \n");
      console.log(_data);
    }
    
    let xheaders: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.token);
    return this.http.post<resType>(this.url + _url, model, { headers: xheaders });
  }
  public uploadPhoto(url: string, id: number, file: File): Observable<boolean> {
    const fd = new FormData();
    fd.append('foto', file);
    fd.append('id', id.toString());
    return this.post<any>(url, fd, true);
  }

  public getCity(): Observable<ResModel<City[]>> {

    return this.post<ResModel<City[]>>("getAllProvinces", null);
  }
  public getCityList(): City[] {
    if (this._cityList == null)
      this.loadCity();
    return this._cityList;
  }
  public getCityCode(cityName: String): number {
    if (!cityName)
      return null;
    return this._cityList.find(f => f.iladi == cityName).ilkodu;
  }
  public getAllJobs(): Observable<ResModel<Job[]>> {
    return this.post<ResModel<Job[]>>("getAllJobs", this.getToken());
  }
  public getCounty(_code: number): Observable<ResModel<County[]>> {
    let p: PostModel<number> = new PostModel(this.getToken());
    p.data = _code;
    return this.post<ResModel<County[]>>("getCounties", p);
  }
  public getCountyByName(name: string): Observable<ResModel<County[]>> {
    let p: PostModel<string> = new PostModel(this.getToken());
    p.data = name;
    return this.post<ResModel<County[]>>("getCountiesByName", p);
  }
  public getEmployeeList(): Observable<Employee[]> {
    this.post<ResModel<Employee[]>>("bmidpergetir",
      new PostModel<string>(this.getToken())).subscribe(
        res => {
          return res.data;
        },
        err => {
          console.log(err);
        }
      );
    return null;
  }

  public getTaxOffice(_code: string): Observable<ResModel<taxOffice[]>> {
    return this.postWithPostModel<ResModel<taxOffice[]>, string>("TaxAdministrationListByName", _code);
  }
  public getUserAuth() {
    if (this.userview.userCode == null)
      return console.log("UserCode is null!");
    this.post<ResModel<UserAuthorizations>>("getAuthorizations", this.userview.userCode)
      .subscribe(
        res => {
          this.userview.auth = res.data;
        },
        err => {
          console.log(err);
        });
  }
  public getUrl(): string {
    return this.url;
  }
  public logout() {
    this._cookieService.deleteAll();
  }
  public isLogin(): boolean {
    // console.log("token= " + this.getToken());
    // console.log("userid= " + this.getUserId());
    // console.log("carecenterid= " + this.getCareCenterId());

    return (this.getToken() != null) && (this.getUserId() != null && this.getUserId() != 0) && (this.getCareCenterId() != null && this.getCareCenterId() != 0);
  }
  public getToken(): string {
    let _token = this._cookieService.get('token');
    if (_token == null)
      console.log("token is null");
    return _token;
  }
  public setToken(_token: string) {
    this._cookieService.set('token', _token);
  }

  public setUserCode(code: string) { this.userview.userCode = code; };
  public getUserCode(): string { return this.userview.userCode };

  public setUserId(id: number) {
    this.userview.userId = id;
    this._cookieService.set('userId', id.toString());
  };
  public getUserId(): number {
    this.userview.userId = Number(this._cookieService.get('userId'));
    return this.userview.userId
  };

  public setUserName(name: string) { this._cookieService.set('userName', name); };
  public getUserName(): string { return this._cookieService.get('userName'); };

  public setCareCenterCode(code: string) { this.userview.careCenterCode = code; };
  public getCareCenterCode(): string { return this.userview.careCenterCode };

  public setCareCenterId(code: number) {
    this._cookieService.set('careCenterId', code.toString());
    this.userview.careCenterId = code;
  };
  public getCareCenterId(): number {
    this.userview.careCenterId = Number(this._cookieService.get('careCenterId'));
    return this.userview.careCenterId;
  };

  // Sorumlu Müdür Adı
  public setResponsibleManagerName(name: string) {
    this._cookieService.set('responsibleManagerName', name);
    this.userview.responsibleManagerName = name;
  };
  public getResponsibleManagerName(): string {
    this.userview.responsibleManagerName = this._cookieService.get('responsibleManagerName');
    if (!this.userview.responsibleManagerName) {
      this.getResponsibleManagerName_FromApi();
    }
    return this.userview.responsibleManagerName;
  };
  public getResponsibleManagerName_FromApi() {
    this.postWithPostModel<ResModel<string>, Number>("getResponsibleManagerId", this.getCareCenterId()).subscribe(
      res => { this.setResponsibleManagerName(res.data); },
      err => { console.log(err); }
    );
  }
  public setCareCenterName(name: string) { this._cookieService.set('careCenterName', name); };
  public getCareCenterName(): string { return this._cookieService.get('careCenterName'); };


  public getToast(type: NotificationTypes, title: string, body: string): Toast {
    let types: string[] = ['default', 'info', 'success', 'warning', 'error'];
    let i: number = 0;
    i = type;
    let t = types[i];
    const toast: Toast = {
      type: t,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    return toast;
  }

  public clearToasts() {
    this.toasterService.clear();
  }

  public getToastConfig(type: NotificationTypes): ToasterConfig {
    let types: string[] = ['default', 'info', 'success', 'warning', 'error'];
    let animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
    let positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
      'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

    let i: number = 0;
    i = type;
    let t = types[i];
    let position = 'toast-top-right';
    let animationType = 'fade';
    let timeout = 5000;
    let toastsLimit = 5;

    let isNewestOnTop = true;
    let isHideOnClick = true;
    let isDuplicatesPrevented = false;

    return new ToasterConfig({
      positionClass: position,
      timeout: timeout,
      newestOnTop: isNewestOnTop,
      tapToDismiss: isHideOnClick,
      preventDuplicates: isDuplicatesPrevented,
      animation: animationType,
      limit: toastsLimit,
    });
  }
  loadCity() {
    this._cityList = [
      {
        "ilkodu": 1,
        "iladi": "ADANA"
      },
      {
        "ilkodu": 2,
        "iladi": "ADIYAMAN"
      },
      {
        "ilkodu": 3,
        "iladi": "AFYONKARAHİSAR"
      },
      {
        "ilkodu": 4,
        "iladi": "AĞRI"
      },
      {
        "ilkodu": 5,
        "iladi": "AMASYA"
      },
      {
        "ilkodu": 6,
        "iladi": "ANKARA"
      },
      {
        "ilkodu": 7,
        "iladi": "ANTALYA"
      },
      {
        "ilkodu": 8,
        "iladi": "ARTVİN"
      },
      {
        "ilkodu": 9,
        "iladi": "AYDIN"
      },
      {
        "ilkodu": 10,
        "iladi": "BALIKESİR"
      },
      {
        "ilkodu": 11,
        "iladi": "BİLECİK"
      },
      {
        "ilkodu": 12,
        "iladi": "BİNGÖL"
      },
      {
        "ilkodu": 13,
        "iladi": "BİTLİS"
      },
      {
        "ilkodu": 14,
        "iladi": "BOLU"
      },
      {
        "ilkodu": 15,
        "iladi": "BURDUR"
      },
      {
        "ilkodu": 16,
        "iladi": "BURSA"
      },
      {
        "ilkodu": 17,
        "iladi": "ÇANAKKALE"
      },
      {
        "ilkodu": 18,
        "iladi": "ÇANKIRI"
      },
      {
        "ilkodu": 19,
        "iladi": "ÇORUM"
      },
      {
        "ilkodu": 20,
        "iladi": "DENİZLİ"
      },
      {
        "ilkodu": 21,
        "iladi": "DİYARBAKIR"
      },
      {
        "ilkodu": 22,
        "iladi": "EDİRNE"
      },
      {
        "ilkodu": 23,
        "iladi": "ELAZIĞ"
      },
      {
        "ilkodu": 24,
        "iladi": "ERZİNCAN"
      },
      {
        "ilkodu": 25,
        "iladi": "ERZURUM"
      },
      {
        "ilkodu": 26,
        "iladi": "ESKİŞEHİR"
      },
      {
        "ilkodu": 27,
        "iladi": "GAZİANTEP"
      },
      {
        "ilkodu": 28,
        "iladi": "GİRESUN"
      },
      {
        "ilkodu": 29,
        "iladi": "GÜMÜŞHANE"
      },
      {
        "ilkodu": 30,
        "iladi": "HAKKARİ"
      },
      {
        "ilkodu": 31,
        "iladi": "HATAY"
      },
      {
        "ilkodu": 32,
        "iladi": "ISPARTA"
      },
      {
        "ilkodu": 33,
        "iladi": "MERSİN (İÇEL)"
      },
      {
        "ilkodu": 34,
        "iladi": "İSTANBUL"
      },
      {
        "ilkodu": 35,
        "iladi": "İZMİR"
      },
      {
        "ilkodu": 36,
        "iladi": "KARS"
      },
      {
        "ilkodu": 37,
        "iladi": "KASTAMONU"
      },
      {
        "ilkodu": 38,
        "iladi": "KAYSERİ"
      },
      {
        "ilkodu": 39,
        "iladi": "KIRKLARELİ"
      },
      {
        "ilkodu": 40,
        "iladi": "KIRŞEHİR"
      },
      {
        "ilkodu": 41,
        "iladi": "KOCAELİ"
      },
      {
        "ilkodu": 42,
        "iladi": "KONYA"
      },
      {
        "ilkodu": 43,
        "iladi": "KÜTAHYA"
      },
      {
        "ilkodu": 44,
        "iladi": "MALATYA"
      },
      {
        "ilkodu": 45,
        "iladi": "MANİSA"
      },
      {
        "ilkodu": 46,
        "iladi": "KAHRAMANMARAŞ"
      },
      {
        "ilkodu": 47,
        "iladi": "MARDİN"
      },
      {
        "ilkodu": 48,
        "iladi": "MUĞLA"
      },
      {
        "ilkodu": 49,
        "iladi": "MUŞ"
      },
      {
        "ilkodu": 50,
        "iladi": "NEVŞEHİR"
      },
      {
        "ilkodu": 51,
        "iladi": "NİĞDE"
      },
      {
        "ilkodu": 52,
        "iladi": "ORDU"
      },
      {
        "ilkodu": 53,
        "iladi": "RİZE"
      },
      {
        "ilkodu": 54,
        "iladi": "SAKARYA"
      },
      {
        "ilkodu": 55,
        "iladi": "SAMSUN"
      },
      {
        "ilkodu": 56,
        "iladi": "SİİRT"
      },
      {
        "ilkodu": 57,
        "iladi": "SİNOP"
      },
      {
        "ilkodu": 58,
        "iladi": "SİVAS"
      },
      {
        "ilkodu": 59,
        "iladi": "TEKİRDAĞ"
      },
      {
        "ilkodu": 60,
        "iladi": "TOKAT"
      },
      {
        "ilkodu": 61,
        "iladi": "TRABZON"
      },
      {
        "ilkodu": 62,
        "iladi": "TUNCELİ"
      },
      {
        "ilkodu": 63,
        "iladi": "ŞANLIURFA"
      },
      {
        "ilkodu": 64,
        "iladi": "UŞAK"
      },
      {
        "ilkodu": 65,
        "iladi": "VAN"
      },
      {
        "ilkodu": 66,
        "iladi": "YOZGAT"
      },
      {
        "ilkodu": 67,
        "iladi": "ZONGULDAK"
      },
      {
        "ilkodu": 68,
        "iladi": "AKSARAY"
      },
      {
        "ilkodu": 69,
        "iladi": "BAYBURT"
      },
      {
        "ilkodu": 70,
        "iladi": "KARAMAN"
      },
      {
        "ilkodu": 71,
        "iladi": "KIRIKKALE"
      },
      {
        "ilkodu": 72,
        "iladi": "BATMAN"
      },
      {
        "ilkodu": 73,
        "iladi": "ŞIRNAK"
      },
      {
        "ilkodu": 74,
        "iladi": "BARTIN"
      },
      {
        "ilkodu": 75,
        "iladi": "ARDAHAN"
      },
      {
        "ilkodu": 76,
        "iladi": "IĞDIR"
      },
      {
        "ilkodu": 77,
        "iladi": "YALOVA"
      },
      {
        "ilkodu": 78,
        "iladi": "KARABÜK"
      },
      {
        "ilkodu": 79,
        "iladi": "KİLİS"
      },
      {
        "ilkodu": 80,
        "iladi": "OSMANİYE"
      },
      {
        "ilkodu": 81,
        "iladi": "DÜZCE"
      }];

  }

  public getCareCenterPhotoURL(): string {
    return this.url + "getPhotocnm/bm/" + this.getCareCenterId() + "?v=" + (this.image_tick++).toString();;
  }
  public getDisablityPhotoURL(id):string{
    return this.url + "getPhotocnm/ik/" + id + "?v=" + (this.image_tick++).toString();
  }
  public getEmployeePhotoURL(id):string{

    return this.url + "getPhotocnm/per/" + id + "?v=" + (this.image_tick++).toString();
  }
  deleteUderline(str: string): string {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] != "_")
        newStr = newStr + str[i];
    }
    return newStr;
  }

}
