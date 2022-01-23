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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AirspaceEditorComponent } from './airspace-editor/airspace-editor.component';
import { OptionEditorComponent } from './option-editor/option-editor.component';
import { RatsEditorComponent } from './rats-editor/rats-editor.component';
import { LoaEditorComponent } from './loa-editor/loa-editor.component';
import { WaveEditorComponent } from './wave-editor/wave-editor.component';
import { AboutComponent } from './about/about.component';
import { NotamComponent } from './notam/notam.component';
import { ReleaseDialog } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AirspaceEditorComponent,
    RatsEditorComponent,
    LoaEditorComponent,
    WaveEditorComponent,
    OptionEditorComponent,
    AboutComponent,
    NotamComponent,
    ReleaseDialog
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
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    FlexLayoutModule,
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
