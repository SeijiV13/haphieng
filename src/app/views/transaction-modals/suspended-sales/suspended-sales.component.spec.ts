import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedSalesComponent } from './suspended-sales.component';

describe('SuspendedSalesComponent', () => {
  let component: SuspendedSalesComponent;
  let fixture: ComponentFixture<SuspendedSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
