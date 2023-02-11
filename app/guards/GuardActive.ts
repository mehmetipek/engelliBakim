import { Injectable } from "../../../node_modules/@angular/core";
import { CanActivate, Router } from "../../../node_modules/@angular/router";
import { AppServiceService } from "../services/appService.service";

@Injectable()
export class GuardActive implements CanActivate {
    canActivate() {
 
        let islogin = this.service.isLogin();
        //console.log(islogin);
        if (!islogin)
            this.router.navigate(['/auth/login']);
       return islogin;
    }
    constructor(private service: AppServiceService, private router: Router) {


    }
}
