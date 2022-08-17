import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStackEditComponent } from './modal-stack-edit.component';

describe('ModalStackEditComponent', () => {
  let component: ModalStackEditComponent;
  let fixture: ComponentFixture<ModalStackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStackEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
