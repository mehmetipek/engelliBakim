import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ToasterService } from 'angular2-toaster';
import { HttpClient } from '@angular/common/http';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-formHeader',
  templateUrl: './formHeader.component.html',
  styleUrls: ['./formHeader.component.scss']
})
export class FormHeaderComponent implements OnInit {
  public id: number;

  constructor(private service: AppServiceService, private toasterService: ToasterService, private http: HttpClient, private localeService: BsLocaleService) {
    this.localeService.use('tr');
    this.id = this.service.getCareCenterId();

   }

  public _photoUrl = "";
  ngOnInit() {
    this._photoUrl = this.service.getCareCenterPhotoURL();
  }

}
