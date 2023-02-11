import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { UserModel, Authorizations } from '../../models/userModel';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { EmployeeForSearchViewModel, EmployeeSearchViewModel } from '../../components/searchEmployee/searchEmployee.component';

@Component({
  selector: 'app-defineUser',
  templateUrl: './defineUser.component.html',
  styleUrls: ['./defineUser.component.css']
})
export class DefineUserComponent implements OnInit {
  public _user: UserModel = new UserModel;
  public xusername = "";
  public userTc: string;
  public _userlist: EmployeeSearchViewModel[];
  constructor(private service: AppServiceService, private route: ActivatedRoute,
    private router: Router) { }

  showDropDown: boolean = false;
  toggleDropDown() {
    setTimeout(() => {
      this.showDropDown = !this.showDropDown;
    }, 200);

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let id = params['id'] || 0;
      console.log(id);
      if (id != 0) {
        this.userTc = id;
        this.getUser();
      }
    });
  }
  SearchUser(searchValue: string) {

    if (searchValue.length > 0) {
      this.getUserByName();
    }
    else {
      this._userlist = [];
    }
  }
  selectUser(user:EmployeeSearchViewModel) {
    console.log(user);
    this.userTc = user.pertcno;
    this._user.personel_id=user.perid;
    this.getUser();
  }
  getUserByName() {
 
    let model:EmployeeForSearchViewModel=new EmployeeForSearchViewModel();
    model.adsoyad=this.xusername;
    this.service.postWithPostModel<ResModel<EmployeeSearchViewModel[]>, EmployeeForSearchViewModel>("EmployeeSearch", model).subscribe(
      res => {
        console.log(res);
        
        this._userlist = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  newUser() {
    this._user = new UserModel;
    this.xusername = "";
  }
  public saveUser() {
    if (!this._user.isuser)
      this.insertUser();
    else
      this.updateUser();
  }
  insertUser() {
    if (!this._user.isuser)
      this.service.postWithPostModel<ResModel<UserModel>, UserModel>("insertIsUser", this._user, true).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }
  updateUser() {
    if (this._user.isuser)
      this.service.postWithPostModel<ResModel<UserModel>, UserModel>("updateIsUser", this._user, true).subscribe(
        res => {
          console.log(res);
          this.getUser();
        },
        err => {
          console.log(err);
        }
      );
  }

  public getUser() {
    this.service.postWithPostModel<ResModel<UserModel>, string>("getIsUser", this.userTc).subscribe(
      res => {
        console.log(res);
        if (!res.data) {
          return;
        }
        this._user = res.data;
        this.xusername = this._user.useradi;
        if (!this._user.yetkimodel)
          this.setAuthorizations();
      },
      err => {
        console.log(err);
      }
    );
  }
  setAuthorizations() {
    this._user.yetkimodel = [
      { islem: "Bilgi Tanımlama", degistirme: false, ekleme: false, goruntuleme: false, kapatma: false, silme: false },
      { islem: "Engelli İşlemleri", degistirme: false, ekleme: false, goruntuleme: false, kapatma: false, silme: false },
      { islem: "Kaite", degistirme: false, ekleme: false, goruntuleme: false, kapatma: false, silme: false },
      { islem: "Raporlar", degistirme: false, ekleme: false, goruntuleme: false, kapatma: false, silme: false },
      { islem: "Kullanıcı Tanımlama", degistirme: false, ekleme: false, goruntuleme: false, kapatma: false, silme: false },

    ];
  }
}
