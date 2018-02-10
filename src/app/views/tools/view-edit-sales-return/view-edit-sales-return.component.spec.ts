import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditSalesReturnComponent } from './view-edit-sales-return.component';

describe('ViewEditSalesReturnComponent', () => {
  let component: ViewEditSalesReturnComponent;
  let fixture: ComponentFixture<ViewEditSalesReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditSalesReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditSalesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
