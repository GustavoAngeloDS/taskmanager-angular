import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStackTasksCountComponent } from './form-stack-tasks-count.component';

describe('FormStackTasksCountComponent', () => {
  let component: FormStackTasksCountComponent;
  let fixture: ComponentFixture<FormStackTasksCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStackTasksCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStackTasksCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
