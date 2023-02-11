/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngelliRaporlariComponent } from './engelli-raporlari.component';

describe('EngelliRaporlariComponent', () => {
  let component: EngelliRaporlariComponent;
  let fixture: ComponentFixture<EngelliRaporlariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngelliRaporlariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngelliRaporlariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
