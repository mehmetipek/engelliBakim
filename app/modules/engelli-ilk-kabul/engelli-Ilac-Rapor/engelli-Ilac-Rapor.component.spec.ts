/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngelliIlacRaporComponent } from './engelli-Ilac-Rapor.component';

describe('EngelliIlacRaporComponent', () => {
  let component: EngelliIlacRaporComponent;
  let fixture: ComponentFixture<EngelliIlacRaporComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngelliIlacRaporComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngelliIlacRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
