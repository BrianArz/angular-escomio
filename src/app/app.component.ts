import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { version, commitHash } from '../environments/version';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  envMessage = environment.ENV_TEXT;
  title = 'angular-escomio';
  appVersion = `${version} - ${commitHash}`;
}
