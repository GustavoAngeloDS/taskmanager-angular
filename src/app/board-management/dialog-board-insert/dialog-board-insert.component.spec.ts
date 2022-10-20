import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoardInsertComponent } from './dialog-board-insert.component';

describe('DialogBoardInsertComponent', () => {
  let component: DialogBoardInsertComponent;
  let fixture: ComponentFixture<DialogBoardInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoardInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoardInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
