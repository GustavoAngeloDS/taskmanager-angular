import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardEditComponent } from './modal-board-edit.component';

describe('ModalBoardEditComponent', () => {
  let component: ModalBoardEditComponent;
  let fixture: ComponentFixture<ModalBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBoardEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
