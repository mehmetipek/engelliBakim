import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';
import { Disabled } from '../../../models/Disabled';
import { UserModel } from '../../../models/userModel';

@Component({
  selector: 'app-userList',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss']
})
export class UserListComponent implements OnInit {
  public _userList: UserListModel[]=[];
  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.getUserList();
  }
  public getUserList() {
    this.service.postWithPostModel<ResModel<UserListModel[]>, number>("getAllUserbyBmId", this.service.getCareCenterId()).subscribe(
      res => {
        console.log(res);
        this._userList=res.data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
export class UserListModel {
  public pertcno;
  public peradi;
  public perkadro;
  public permeslek;
  public persoyadi;
  public pertel1;
  public userkodu;
}