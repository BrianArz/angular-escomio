import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { commitHash, version } from '../../../environments/version';
import { NavbarComponent } from '../navbar/navbar.component';
import { HealthService } from '../../services/health/health-service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  providers: [HealthService],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})

export class WelcomeComponent {
  envMessage: string = environment.ENV_TEXT;
  appVersion: string = `${version} - ${commitHash}`;
  serviceVersion: string = '';

  // Constructor with dependency injections
  constructor(
    private healtService: HealthService
  ) {
  }

  /**
   * Initializes the component 
   * 
   * Obtains API service version
   */
  ngOnInit() {
    this.healtService.getServiceVersion().subscribe({
      next: (response) => {
        // Stores service version on successful retrieval
        this.serviceVersion = response.message;
      },
      error: (error) => {
        // Stores error message if an error occurs
        this.serviceVersion = error.message;
      }
    });
  }

}
