import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorControlComponent } from './administrator-control.component';

describe('AdministratorControlComponent', () => {
  let component: AdministratorControlComponent;
  let fixture: ComponentFixture<AdministratorControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
