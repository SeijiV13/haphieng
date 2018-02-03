import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEntriesComponent } from './sales-entries.component';

describe('SalesEntriesComponent', () => {
  let component: SalesEntriesComponent;
  let fixture: ComponentFixture<SalesEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
