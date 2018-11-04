import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFromCustomersEntriesComponent } from './collection-from-customers-entries.component';

describe('CollectionFromCustomersEntriesComponent', () => {
  let component: CollectionFromCustomersEntriesComponent;
  let fixture: ComponentFixture<CollectionFromCustomersEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionFromCustomersEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFromCustomersEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
