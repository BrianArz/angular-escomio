import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { commitHash, version } from '../../environments/version';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  envMessage = environment.ENV_TEXT;
  appVersion = `${version} - ${commitHash}`;
}
