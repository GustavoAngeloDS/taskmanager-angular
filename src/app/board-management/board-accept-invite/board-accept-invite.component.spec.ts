import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAcceptInviteComponent } from './board-accept-invite.component';

describe('BoardAcceptInviteComponent', () => {
  let component: BoardAcceptInviteComponent;
  let fixture: ComponentFixture<BoardAcceptInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardAcceptInviteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardAcceptInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
