import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { NavbarComponent } from './components/navbar/navbar.component';

// Utils
import { environment } from '../environments/environment';
import { version, commitHash } from '../environments/version';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  envMessage = environment.ENV_TEXT;
  title = 'angular-escomio';
  appVersion = `${version} - ${commitHash}`;
}
