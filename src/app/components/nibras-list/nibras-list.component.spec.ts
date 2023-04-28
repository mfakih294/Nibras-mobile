import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NibrasListComponent } from './nibras-list.component';

describe('NibrasListComponent', () => {
  let component: NibrasListComponent;
  let fixture: ComponentFixture<NibrasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NibrasListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NibrasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
