import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskDuedateComponent } from './dialog-task-duedate.component';

describe('DialogTaskDuedateComponent', () => {
  let component: DialogTaskDuedateComponent;
  let fixture: ComponentFixture<DialogTaskDuedateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTaskDuedateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskDuedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
