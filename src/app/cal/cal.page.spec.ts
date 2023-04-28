import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalPage } from './cal.page';

describe('CalPage', () => {
  let component: CalPage;
  let fixture: ComponentFixture<CalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
