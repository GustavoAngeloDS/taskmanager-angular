import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoardDetailsComponent } from './modal-board-details.component';

describe('ModalBoardDetailsComponent', () => {
  let component: ModalBoardDetailsComponent;
  let fixture: ComponentFixture<ModalBoardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBoardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBoardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
