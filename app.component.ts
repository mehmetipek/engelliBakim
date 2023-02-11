/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'ngx-app',
  styleUrls: ['./app.component.scss'],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor() {
    setTheme('bs4'); // or 'bs4'
  }

  ngOnInit(): void {
    //this.analytics.trackPageViews();
  }
}
