import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { FileSaverModule } from 'ngx-filesaver';

import { AirspaceEditorComponent } from './airspace-editor/airspace-editor.component';
import { OptionEditorComponent } from './option-editor/option-editor.component';
import { RatsEditorComponent } from './rats-editor/rats-editor.component';
import { LoaEditorComponent } from './loa-editor/loa-editor.component';
import { WaveEditorComponent } from './wave-editor/wave-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    AirspaceEditorComponent,
    RatsEditorComponent,
    LoaEditorComponent,
    WaveEditorComponent,
    OptionEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    LayoutModule,
    FileSaverModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
