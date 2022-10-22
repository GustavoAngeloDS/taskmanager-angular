import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardInvitation } from 'src/app/shared/models/board-invitation.model';
import { BoardManagementService } from '../services/board-management.service';

@Component({
  selector: 'app-board-accept-invite',
  templateUrl: './board-accept-invite.component.html',
  styleUrls: ['./board-accept-invite.component.css']
})
export class BoardAcceptInviteComponent implements OnInit {

  boardInvitation!: BoardInvitation;

  isCheckingInvite: boolean = true;
  isInviteInvalid: boolean = false;
  isInviteValid: boolean = false;

  constructor(private route: ActivatedRoute, private boardManagementService: BoardManagementService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const invitationId = this.route.snapshot.params['invitationId'];
    await new Promise(f => setTimeout(f, 4000));

    this.confirmBoardInvitation(invitationId);
  }

  confirmBoardInvitation(invitationId: string) {
    this.boardManagementService.confirmBoardInvitation(invitationId).subscribe({
      next: (boardInvitation: BoardInvitation) => this.boardInvitation = boardInvitation,
      complete: () => {
        this.isCheckingInvite = false;
        this.setPropertiesAfterInviteValidation();
        if (this.isInviteValid) this.navigateToLoginPage();
      }
    });
  }

  async navigateToLoginPage() {
    await new Promise(f => setTimeout(f, 5000));
    this.router.navigate(["/login"]);
  }

  setPropertiesAfterInviteValidation() {
    this.boardInvitation == null || this.boardInvitation == undefined ? this.isInviteInvalid = true : this.isInviteValid = true;
  }
}