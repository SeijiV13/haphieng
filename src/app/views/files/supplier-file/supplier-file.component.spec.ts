import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFileComponent } from './supplier-file.component';

describe('SupplierFileComponent', () => {
  let component: SupplierFileComponent;
  let fixture: ComponentFixture<SupplierFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
