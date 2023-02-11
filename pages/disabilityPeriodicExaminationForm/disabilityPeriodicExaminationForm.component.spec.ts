/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisabilityPeriodicExaminationFormComponent } from './disabilityPeriodicExaminationForm.component';

describe('DisabilityPeriodicExaminationFormComponent', () => {
  let component: DisabilityPeriodicExaminationFormComponent;
  let fixture: ComponentFixture<DisabilityPeriodicExaminationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityPeriodicExaminationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityPeriodicExaminationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
