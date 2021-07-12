import { Component } from '@angular/core';

import * as Realm from 'realm-web';

@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.css']
})
export class NotamComponent {

  // Download notam data from MongoDB Realm
  getnotam(brief: string): void {
    const app: Realm.App = new Realm.App({ id: "navplot-jdtfo" });

    this.request(app, brief).then( val => {
      const blob = new Blob([val.pdf], { type: "application/pdf" });
      saveAs(blob, brief.concat(".pdf"));
    });
  }

  // Log-in and request data
  async request(app: Realm.App, brief: string): Promise<any> {
    // Create (read-only) API credentials
    const credentials = Realm.Credentials.apiKey("1KJQsxm3xp21XiAlEWEiFc22bLxH9pdNdJTC00AiAfbDMc1bUoOEExN97bkYSLcr");

    const user: Realm.User = await app.logIn(credentials);

    const out = await user.functions.getnotam(brief);
    return out;
  }
}
