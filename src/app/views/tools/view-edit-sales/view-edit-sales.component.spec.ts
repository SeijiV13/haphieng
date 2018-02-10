import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditSalesComponent } from './view-edit-sales.component';

describe('ViewEditSalesComponent', () => {
  let component: ViewEditSalesComponent;
  let fixture: ComponentFixture<ViewEditSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
