import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NbMenuService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AppServiceService } from '../../../services/appService.service';
import { MENU_ITEMS } from '../../../pages/pages-menu';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from '../../../pages/employee/employee.component';
import { Employee } from '../../../models/Employee';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public newlink:string;
  @Input() position = 'normal';

  user: any;

  userMenu = [ { title: 'Çıkış Yap', link:"/auth/login" }];
  menu:NbMenuItem[]=MENU_ITEMS;

  constructor( private route: ActivatedRoute,
    private router: Router,
   private service:AppServiceService) {
  }

  ngOnInit() {
    let _user= { name: this.service.getUserName(), picture: 'https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png' };
     this.user=_user;
  }
  gotoPage(c:NbMenuItem){
    // queryParams:{"ktg":"psikoSosyal"}
    this.router.navigate([c.link],{queryParams: c.queryParams});
   
    if(this.newlink==c.link){
       window.location.reload();
     }
    this.newlink=c.link;
  }
//   refresh(): void {
//     window.location.reload();
// }
  gotoLink(l){
    // queryParams:{"ktg":"psikoSosyal"}
    this.router.navigate(l);
  }

}
