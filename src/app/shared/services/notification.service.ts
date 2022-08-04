import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showWarning(message: string): void {
    this.toastr.warning(message, 'Aviso', {
      timeOut: 10000,
      positionClass: 'toast-top-right',
      progressBar: true
    })
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Mensagem', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true
    })
  }

  showError(message: string): void {
    this.toastr.error(message, 'Erro', {
      timeOut: 10000,
      positionClass: 'toast-top-right',
      progressBar: true
    })
  }
}
