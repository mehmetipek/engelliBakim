/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EngelliMamaRaporComponent } from './engelli-mama-rapor.component';

describe('EngelliMamaRaporComponent', () => {
  let component: EngelliMamaRaporComponent;
  let fixture: ComponentFixture<EngelliMamaRaporComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngelliMamaRaporComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngelliMamaRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
