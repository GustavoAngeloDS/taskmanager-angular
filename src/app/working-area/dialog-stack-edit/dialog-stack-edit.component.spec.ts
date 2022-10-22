import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStackEditComponent } from './dialog-stack-edit.component';

describe('DialogStackEditComponent', () => {
  let component: DialogStackEditComponent;
  let fixture: ComponentFixture<DialogStackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStackEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
