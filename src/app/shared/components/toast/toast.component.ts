import { ToastService } from './../../services/toast.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200' }
})
export class ToastComponent implements OnInit {

  service: any;

  constructor(public toastService: ToastService) {
    this.service = this.toastService;
  }

  ngOnInit(): void {
    (this.toastService);

  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
