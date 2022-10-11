import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoardEditComponent } from './dialog-board-edit.component';

describe('DialogBoardEditComponent', () => {
  let component: DialogBoardEditComponent;
  let fixture: ComponentFixture<DialogBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
