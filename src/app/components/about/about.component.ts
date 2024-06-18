import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as APP from '../../utils/protocols/common.protocols';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  chatRoute: string = APP.ESCOMIO;
}
