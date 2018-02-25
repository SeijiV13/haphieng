import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnReportsComponent } from './purchase-return-reports.component';

describe('PurchaseReturnReportsComponent', () => {
  let component: PurchaseReturnReportsComponent;
  let fixture: ComponentFixture<PurchaseReturnReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
