import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagManagementComponent } from './dialog-tag-management.component';

describe('DialogTagManagementComponent', () => {
  let component: DialogTagManagementComponent;
  let fixture: ComponentFixture<DialogTagManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTagManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
