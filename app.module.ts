/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GuardActive } from './guards/GuardActive';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { trLocale } from 'ngx-bootstrap/locale';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
defineLocale('tr', trLocale);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    FormsModule,
    TextMaskModule,
    ToasterModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxEchartsModule,
    ChartsModule,
    PdfViewerModule,
    PdfJsViewerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    CookieService,
    ToasterService,
    GuardActive
  ],
})
export class AppModule {
  constructor(private localeService: BsLocaleService) {
    this.localeService.use('tr');
  }
}
