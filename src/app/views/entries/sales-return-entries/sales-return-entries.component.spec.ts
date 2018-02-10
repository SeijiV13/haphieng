import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnEntriesComponent } from './sales-return-entries.component';

describe('SalesReturnEntriesComponent', () => {
  let component: SalesReturnEntriesComponent;
  let fixture: ComponentFixture<SalesReturnEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
