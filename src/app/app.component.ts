import { Component } from '@angular/core';

import { PromptUpdateService } from './prompt-update.service'
import { YaixmService } from './yaixm.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  yaixm: any = {};

  constructor(private promptUpdateService: PromptUpdateService,
              private yaixmService: YaixmService) {
  }

  ngOnInit() {
    this.getYaixm();
  }

  getYaixm() {
    this.yaixmService.getYaixm().subscribe(yaixm => {
      this.yaixm = yaixm;
    })
  }
}
