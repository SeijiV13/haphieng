import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInOutComponent } from './item-in-out.component';

describe('ItemInOutComponent', () => {
  let component: ItemInOutComponent;
  let fixture: ComponentFixture<ItemInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
