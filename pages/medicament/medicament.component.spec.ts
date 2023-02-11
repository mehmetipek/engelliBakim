import { MedicamentComponent } from "./medicament.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ThemeModule } from "../../@theme/theme.module";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToasterService } from "angular2-toaster";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Medicament } from "../../modules/engelli-ilk-kabul/engelli-Ilac-Rapor/engelli-Ilac-Rapor.component";

// /* tslint:disable:no-unused-variable */
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

// import { MedicamentComponent } from './medicament.component';

// describe('MedicamentComponent', () => {
//   let component: MedicamentComponent;
//   let fixture: ComponentFixture<MedicamentComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ MedicamentComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MedicamentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('true should be true', () => {
//     expect(true).toBe(true);

//   });
//   it('true should be true', () => {
//     expect(true).toBe(true);

//   });
// });
describe('MedicamentComponent', () => {
    let component: MedicamentComponent;
    let fixture: ComponentFixture<MedicamentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MedicamentComponent],
            imports: [ThemeModule.forRoot(), HttpClientModule, NgbModule.forRoot()],
            providers: [CookieService, ToasterService, NgbModal]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MedicamentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('true should be true', () => {
        expect(true).toBe(true);
    });
    it('should get madicamentlist', () => {
        component.getIlac();
        let list:Medicament[]=component.ilacList;
        console.log(list);
        expect(list.length).toBeGreaterThan(0);
    });
});