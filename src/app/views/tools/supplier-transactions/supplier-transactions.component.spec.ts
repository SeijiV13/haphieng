import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTransactionsComponent } from './supplier-transactions.component';

describe('SupplierTransactionsComponent', () => {
  let component: SupplierTransactionsComponent;
  let fixture: ComponentFixture<SupplierTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
