import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBankFileComponent } from './customer-bank-file.component';

describe('CustomerBankFileComponent', () => {
  let component: CustomerBankFileComponent;
  let fixture: ComponentFixture<CustomerBankFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBankFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBankFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
