import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-choosePage',
  templateUrl: './choosePage.component.html',
  styleUrls: ['./choosePage.component.scss']
})
export class ChoosePageComponent implements OnInit {
  public link: string = "/";
  public kategori: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.kategori = params["ktg"];
    });
    // this.route.params.pipe(switchMap((params: Params) => {

    // }/*... */));
    // this.route.params.forEach((params: Params) => {
    //   debugger;
    //   if (params['kategori'] !== undefined) {
    //     console.log(params['id']);
    //   } 
    // });
  }
  goto(type: string) {
    if (type == "plan") {
      switch (this.kategori) {
        case "psikoSosyal":
          this.link="pages/psychosocialPlanList"
          break;
        case "health":
        this.link="pages/healtPlanList"
          break;
        case "genel":
        this.link="pages/generalPlanList"
          break;
      }
      this.router.navigate([this.link]);
    }
    if (type == "kayit") {
      this.link="pages/kayitFormu"
      this.router.navigate([this.link],{queryParams:{"ktg":this.kategori}});
    }
  }
  // public r:routing[]=[
  //   {kategori="psikoSosyal",}
  // ];


}

