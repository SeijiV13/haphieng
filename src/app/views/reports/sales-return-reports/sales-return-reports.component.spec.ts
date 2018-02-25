import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnReportsComponent } from './sales-return-reports.component';

describe('SalesReturnReportsComponent', () => {
  let component: SalesReturnReportsComponent;
  let fixture: ComponentFixture<SalesReturnReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
