/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisabletedActivityPlanListComponent } from './disabletedActivityPlanList.component';

describe('DisabletedActivityPlanListComponent', () => {
  let component: DisabletedActivityPlanListComponent;
  let fixture: ComponentFixture<DisabletedActivityPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabletedActivityPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabletedActivityPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
