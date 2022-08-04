import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardDeleteComponent } from './modal-board-delete.component';

describe('ModalBoardDeleteComponent', () => {
  let component: ModalBoardDeleteComponent;
  let fixture: ComponentFixture<ModalBoardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBoardDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
