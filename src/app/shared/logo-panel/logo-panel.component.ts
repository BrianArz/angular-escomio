import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-panel',
  standalone: true,
  imports: [],
  templateUrl: './logo-panel.component.html',
  styleUrl: './logo-panel.component.css'
})
export class LogoPanelComponent {
  @Input() logoSrc: string = '';
}
