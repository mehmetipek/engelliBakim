/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisablitySearchWithTypeHeadComponent } from './disablitySearchWithTypeHead.component';

describe('DisablitySearchWithTypeHeadComponent', () => {
  let component: DisablitySearchWithTypeHeadComponent;
  let fixture: ComponentFixture<DisablitySearchWithTypeHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisablitySearchWithTypeHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisablitySearchWithTypeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
