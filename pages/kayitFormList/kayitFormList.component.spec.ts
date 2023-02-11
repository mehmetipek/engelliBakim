/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KayitFormListComponent } from './kayitFormList.component';

describe('KayitFormListComponent', () => {
  let component: KayitFormListComponent;
  let fixture: ComponentFixture<KayitFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KayitFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KayitFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
