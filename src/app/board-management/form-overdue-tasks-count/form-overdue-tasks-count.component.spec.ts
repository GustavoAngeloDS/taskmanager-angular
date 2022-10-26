import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOverdueTasksCountComponent } from './form-overdue-tasks-count.component';

describe('FormOverdueTasksCountComponent', () => {
  let component: FormOverdueTasksCountComponent;
  let fixture: ComponentFixture<FormOverdueTasksCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOverdueTasksCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOverdueTasksCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
