/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImageOperationComponent } from './imageOperation.component';

describe('ImageOperationComponent', () => {
  let component: ImageOperationComponent;
  let fixture: ComponentFixture<ImageOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
