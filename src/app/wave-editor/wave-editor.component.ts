import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wave-editor',
  templateUrl: './wave-editor.component.html',
  styleUrls: ['./wave-editor.component.css']
})
export class WaveEditorComponent {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = [];

  constructor() {}
}
