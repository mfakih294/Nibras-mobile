import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPage } from './p.page';

import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';

describe('PPage', () => {
  let component: PPage;
  let fixture: ComponentFixture<PPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
