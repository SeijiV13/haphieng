import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvDamageEntriesComponent } from './inv-damage-entries.component';

describe('InvDamageEntriesComponent', () => {
  let component: InvDamageEntriesComponent;
  let fixture: ComponentFixture<InvDamageEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvDamageEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvDamageEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
