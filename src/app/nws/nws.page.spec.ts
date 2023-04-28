import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NwsPage } from './nws.page';

describe('NwsPage', () => {
  let component: NwsPage;
  let fixture: ComponentFixture<NwsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NwsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
