import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskNotifConfigComponent } from './dialog-task-notif-config.component';

describe('DialogTaskNotifConfigComponent', () => {
  let component: DialogTaskNotifConfigComponent;
  let fixture: ComponentFixture<DialogTaskNotifConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskNotifConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskNotifConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
