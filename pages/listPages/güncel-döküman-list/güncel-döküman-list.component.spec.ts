/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GüncelDökümanListComponent } from './güncel-döküman-list.component';

describe('GüncelDökümanListComponent', () => {
  let component: GüncelDökümanListComponent;
  let fixture: ComponentFixture<GüncelDökümanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GüncelDökümanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GüncelDökümanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
