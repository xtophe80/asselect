import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rats-editor',
  templateUrl: './rats-editor.component.html',
  styleUrls: ['./rats-editor.component.css']
})
export class RatsEditorComponent {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = []

  constructor() {}
}
