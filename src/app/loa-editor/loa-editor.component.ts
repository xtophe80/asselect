import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loa-editor',
  templateUrl: './loa-editor.component.html',
  styleUrls: ['./loa-editor.component.css']
})
export class LoaEditorComponent {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = [];

  constructor() {}
}
