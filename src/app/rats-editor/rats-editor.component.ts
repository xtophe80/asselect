import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { YaixmService } from '../yaixm.service';

@Component({
  selector: 'app-rats-editor',
  templateUrl: './rats-editor.component.html',
  styleUrls: ['./rats-editor.component.css']
})
export class RatsEditorComponent {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() yaixm = Object();

  names: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.yaixm['rat'] === undefined)
      return;

    let formArray = this.airspaceForm.get('rats') as FormArray;

    for (let rat of this.yaixm['rat']) {
      this.names.push(rat['name']);
      formArray.push(new FormControl(false));
    }
  }
}
