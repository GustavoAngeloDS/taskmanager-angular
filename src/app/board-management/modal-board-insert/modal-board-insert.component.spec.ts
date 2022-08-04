import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardInsertComponent } from './modal-board-insert.component';

describe('ModalBoardInsertComponent', () => {
  let component: ModalBoardInsertComponent;
  let fixture: ComponentFixture<ModalBoardInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBoardInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoardInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
