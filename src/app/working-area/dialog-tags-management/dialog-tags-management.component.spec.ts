import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagsManagementComponent } from './dialog-tags-management.component';

describe('DialogTagsManagementComponent', () => {
  let component: DialogTagsManagementComponent;
  let fixture: ComponentFixture<DialogTagsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTagsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
