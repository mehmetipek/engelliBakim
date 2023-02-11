import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { Router } from '@angular/router';
import { ResModel } from '../../models/resModel';
import { UserViewModel } from '../../models/userViewModel';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { CookieService } from '../../../../node_modules/ngx-cookie-service';
import { RequestOptions } from '../../../../node_modules/@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') txt_username: ElementRef;
  @ViewChild('password') txt_password: ElementRef;
  public _loginModel: loginModel = new loginModel();
  public photoUrl = 'http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg';

  constructor(private router: Router, private service: AppServiceService, private http: HttpClient, private _cookieService: CookieService) {
    this.service.logout();
    this.giris = new giris();
  }

  ngOnInit() {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      withCredentials: true
    };
  }

  public giris: giris;
  public Login: login = new login();
  public isLogin: boolean = false;
  public resLogin: resLoginModel = new resLoginModel();
  public fields: loginFields = new loginFields();

  public getCompanyName() {
    this.Login.bmKodu = this.giris.firmaKod;
    this.service.postWithPostModel<ResModel<string>, string>("getBmName", this.giris.firmaKod).subscribe(
      res => {
        this.giris.firmaAd = res.data;
        this.service.setCareCenterCode(this.giris.firmaKod);
        this.service.setCareCenterName(this.giris.firmaAd);
        // Login metodunda gönderilecek.
        this._loginModel.bmkodu = this.giris.firmaKod;
        //console.log(res);
        this.txt_username.nativeElement.focus();
      },
      err => {
        console.log(err);
        this.giris.firmaAd = "Tekrar Deneyin!";
      }
    );

  }

  public getUserName() {

    this.service.postWithPostModel<ResModel<string>, string>("getUserName", this.giris.kulKod).subscribe(
      res => {
        this.giris.kulAd = res.data;
        this.service.setUserCode(this.giris.kulKod);
        this.service.setUserName(this.giris.kulAd);
        // Login metodunda gönderilecek.
        this._loginModel.userkodu = this.giris.kulKod;
        this.txt_password.nativeElement.focus();
      },
      err => {
        console.log(err);
        this.giris.kulAd = "Tekrar Deneyin!";
      }
    );
  }

  public login() {
    let sonuc: string;
    this.Login.bmKodu = this.giris.sifre;

    // Login metodunda gönderilecek.
    this._loginModel.bmkodu = this.giris.firmaKod;
    this._loginModel.userkodu = this.giris.kulKod;
    this._loginModel.userpass = this.giris.sifre;

    this.service.postWithPostModel<ResModel<UserViewModel>, loginModel>("login", this._loginModel,true).subscribe(
      res => {
        this.isLogin = true;
        console.log(res);
        if (res.isSuccess) {
          this.router.navigate(['pages/dashboard']);
          this.service.setToken(res.data.token);
          this.service.setCareCenterId(res.data.careCenterId);
          this.service.setUserId(res.data.userId);
          this.service.getResponsibleManagerName_FromApi();
        }
        else
          alert("Lütfen tekrar deneyiniz.");
      },
      err => {
        console.log(err);
        this.isLogin = false;
        alert("Tekrar Deneyin");
      }
    );

  }
  // public login() {
  //   let body = new URLSearchParams();
  //   body.set('username', "28");
  //   body.set('password', "28");
  //   let options = {
  //     headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
  //     withCredentials: true
  //   };


  //   this.http.post<loginFields>("http://localhost:8080/engellibakimv2/login", body.toString(), options).subscribe(
  //     res => {
  //       console.log(res);
  //       console.log(this._cookieService.get('JSESSIONID'));
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );

  // }



}

export class giris {
  public firmaKod: string;
  public firmaAd: string;
  public kulKod: string;
  public kulAd: string;
  public sifre: string;
}

export class login {
  public bmKodu: string;
}

export class resLoginModel {
  public izin: boolean;
  public sayi: string;
}

export class loginFields {
  public password: string;
  public username: string;
}
class loginModel {
  public bmkodu: string;
  public userkodu: string;
  public userpass: string;
}