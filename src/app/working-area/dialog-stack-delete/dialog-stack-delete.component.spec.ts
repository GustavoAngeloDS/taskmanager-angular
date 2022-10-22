import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStackDeleteComponent } from './dialog-stack-delete.component';

describe('DialogStackDeleteComponent', () => {
  let component: DialogStackDeleteComponent;
  let fixture: ComponentFixture<DialogStackDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStackDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStackDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
