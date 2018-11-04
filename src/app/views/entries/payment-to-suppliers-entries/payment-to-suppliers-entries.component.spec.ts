import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentToSuppliersEntriesComponent } from './payment-to-suppliers-entries.component';

describe('PaymentToSuppliersEntriesComponent', () => {
  let component: PaymentToSuppliersEntriesComponent;
  let fixture: ComponentFixture<PaymentToSuppliersEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentToSuppliersEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentToSuppliersEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
