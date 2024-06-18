import { DataTablesModule } from 'angular-datatables';
import { Component, LOCALE_ID } from '@angular/core';
import { Config } from 'datatables.net';
import localeEs from '@angular/common/locales/es';

import { AdminService } from '../../services/admin/admin-service';
import { CommonModule, registerLocaleData } from '@angular/common';
import { GetSuggestionsResponse } from '../../models/admin/get-suggestions-response';

registerLocaleData(localeEs)

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [DataTablesModule, CommonModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class SuggestionsComponent {

  suggestions: GetSuggestionsResponse[] = [];
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

    this.adminService.getSuggestions().subscribe({
      next: (response: GetSuggestionsResponse[]) => {
        this.suggestions = response;
        this.isLoading = false;
      }
    });
  }

}
