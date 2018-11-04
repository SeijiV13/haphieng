import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuppliersEntriesComponent } from './payment-suppliers-entries.component';

describe('PaymentSuppliersEntriesComponent', () => {
  let component: PaymentSuppliersEntriesComponent;
  let fixture: ComponentFixture<PaymentSuppliersEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSuppliersEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuppliersEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
