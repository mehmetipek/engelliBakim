/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngelliBezRaporlariComponent } from './engelli-bez-raporlari.component';

describe('EngelliBezRaporlariComponent', () => {
  let component: EngelliBezRaporlariComponent;
  let fixture: ComponentFixture<EngelliBezRaporlariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngelliBezRaporlariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngelliBezRaporlariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
