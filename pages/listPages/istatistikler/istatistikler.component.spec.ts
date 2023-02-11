/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IstatistiklerComponent } from './istatistikler.component';

describe('IstatistiklerComponent', () => {
  let component: IstatistiklerComponent;
  let fixture: ComponentFixture<IstatistiklerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatistiklerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatistiklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
