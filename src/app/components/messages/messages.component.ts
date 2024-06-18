import { DataTablesModule } from 'angular-datatables';
import { Component, LOCALE_ID } from '@angular/core';
import { Config } from 'datatables.net';
import localeEs from '@angular/common/locales/es';

import { GetMessagesResponse } from '../../models/admin/get-messages-response';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AdminService } from '../../services/admin/admin-service';

registerLocaleData(localeEs)

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [DataTablesModule, CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class MessagesComponent {

  messages: GetMessagesResponse[] = [];
  dtoptions: Config = {}

  isLoading: boolean = true;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {

    this.dtoptions = {
      pagingType: 'full',
      pageLength: 10,
      language: {
        url: 'assets/datatables/es-ES.json'
      }
    }

    this.adminService.getMessages().subscribe({
      next: (response: GetMessagesResponse[]) => {
        this.messages = response;
        this.isLoading = false;
      }
    });
  }

}
