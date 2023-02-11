/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SixImageOperationComponent } from './sixImageOperation.component';

describe('SixImageOperationComponent', () => {
  let component: SixImageOperationComponent;
  let fixture: ComponentFixture<SixImageOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixImageOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixImageOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
