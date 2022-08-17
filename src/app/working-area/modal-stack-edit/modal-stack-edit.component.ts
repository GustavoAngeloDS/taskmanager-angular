import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stack } from 'src/app/shared/models/stack.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WorkingAreaService } from '../services/working-area.service';

@Component({
  selector: 'app-modal-stack-edit',
  templateUrl: './modal-stack-edit.component.html',
  styleUrls: ['./modal-stack-edit.component.css']
})
export class ModalStackEditComponent implements OnInit {

  @Input() stack!: Stack;
  @Input() boardId!: string;

  constructor(private workingAreaService: WorkingAreaService, public activeModal: NgbActiveModal, public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  updateStack() {
    this.workingAreaService.updateStack(this.boardId, this.stack).subscribe({
      complete: () => {
        this.notificationService.showSuccess("Stack atualizada");
        this.activeModal.close();
      },
      error: (error) => this.notificationService.showError(error.message)
    });
  }

}
