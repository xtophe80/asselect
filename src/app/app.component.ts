import { Component } from '@angular/core';

import { PromptUpdateService } from './prompt-update.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private promptUpdateService: PromptUpdateService) {}
}
