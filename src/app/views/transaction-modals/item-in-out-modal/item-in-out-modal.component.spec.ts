import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInOutModalComponent } from './item-in-out-modal.component';

describe('ItemInOutModalComponent', () => {
  let component: ItemInOutModalComponent;
  let fixture: ComponentFixture<ItemInOutModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInOutModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInOutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
