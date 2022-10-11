import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoardDeleteComponent } from './dialog-board-delete.component';

describe('DialogBoardDeleteComponent', () => {
  let component: DialogBoardDeleteComponent;
  let fixture: ComponentFixture<DialogBoardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoardDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
