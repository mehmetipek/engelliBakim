/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DefineMedicamentComponent } from './defineMedicament.component';

describe('DefineMedicamentComponent', () => {
  let component: DefineMedicamentComponent;
  let fixture: ComponentFixture<DefineMedicamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineMedicamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
