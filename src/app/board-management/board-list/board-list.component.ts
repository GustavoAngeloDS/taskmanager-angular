import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Action } from 'src/app/shared/enums/action';
import { Board } from 'src/app/shared/models/board.model';
import { PageBehavior } from 'src/app/shared/models/internal/page-behavior.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ModalBoardDeleteComponent } from '../modal-board-delete/modal-board-delete.component';
import { ModalBoardDetailsComponent } from '../modal-board-details/modal-board-details.component';
import { ModalBoardInsertComponent } from '../modal-board-insert/modal-board-insert.component';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent extends PageBehavior implements OnInit {

  boardList: Array<Board> = [];

  boardListSelectorFilter: string = "ALL";

  constructor(public sessionService: SessionService, private modalService: NgbModal, private boardManagementService: BoardManagementService, private notificationService: NotificationService) {
    super(false, Action.VIEWING);
  }

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.isLoadCompleted = false;

    this.boardManagementService.findAll().subscribe(
      (boards: Array<Board>) => {
        this.boardList = boards;
      }, (error) => { this.notificationService.showError(error.message) },
      () => this.isLoadCompleted = true);
  }

  openModalBoardDetails(board: Board): void {
    const modal = this.modalService.open(ModalBoardDetailsComponent);
    modal.componentInstance.board = board;
  }

  openModalBoardDelete(board: Board): void {
    const modal = this.modalService.open(ModalBoardDeleteComponent);
    modal.componentInstance.board = board;
    modal.closed.subscribe({ complete: () => this.loadBoards() });
  }

  openModalBoardInsert(): void {
    const modal = this.modalService.open(ModalBoardInsertComponent);
    modal.closed.subscribe({ complete: () => this.loadBoards() });
  }

  filterBoardList(): Array<Board> {
    let filteredBoardList: Array<Board> = [];
    if (this.boardListSelectorFilter === "ALL") {
      filteredBoardList = this.boardList;
    } else if (this.boardListSelectorFilter === "MINE") {
      filteredBoardList = this.boardList.filter((board) => board.owner?.id === this.sessionService.loggedUser!.id)
    } else {
      filteredBoardList = this.boardList.filter((board) => board.owner?.id !== this.sessionService.loggedUser?.id);
    }

    return filteredBoardList;
  }
}
