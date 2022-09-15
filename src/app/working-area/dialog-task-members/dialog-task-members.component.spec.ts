import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskMembersComponent } from './dialog-task-members.component';

describe('DialogTaskMembersComponent', () => {
  let component: DialogTaskMembersComponent;
  let fixture: ComponentFixture<DialogTaskMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
