import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGeneralManagementComponent } from './dialog-general-management.component';

describe('DialogGeneralManagementComponent', () => {
  let component: DialogGeneralManagementComponent;
  let fixture: ComponentFixture<DialogGeneralManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGeneralManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGeneralManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
