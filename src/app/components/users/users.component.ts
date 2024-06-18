import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
declare var $: JQueryStatic;
import 'datatables.net';

import { AdminService } from './../../services/admin/admin-service';
import { GetUsersResponse } from '../../models/admin/get-users-response';
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: GetUsersResponse[] = [];
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

    this.adminService.getUsers().subscribe({
      next: (response: GetUsersResponse[]) => {
        this.users = response;
        this.isLoading = false;
      }
    });
  }
}
