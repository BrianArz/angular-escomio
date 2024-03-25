import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { version, commitHash } from '../environments/version';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  envMessage = environment.ENV_TEXT;
  title = 'angular-escomio';
  appVersion = `${version} - ${commitHash}`;
}
