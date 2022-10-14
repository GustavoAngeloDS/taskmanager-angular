import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMembersManagementComponent } from './dialog-members-management.component';

describe('DialogMembersManagementComponent', () => {
  let component: DialogMembersManagementComponent;
  let fixture: ComponentFixture<DialogMembersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMembersManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMembersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
