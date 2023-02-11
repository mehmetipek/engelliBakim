/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngelliVasiComponent } from './engelli-vasi.component';

describe('EngelliVasiComponent', () => {
  let component: EngelliVasiComponent;
  let fixture: ComponentFixture<EngelliVasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngelliVasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngelliVasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
