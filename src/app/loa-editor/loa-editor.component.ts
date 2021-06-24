import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { YaixmService } from '../yaixm.service';

@Component({
  selector: 'app-loa-editor',
  templateUrl: './loa-editor.component.html',
  styleUrls: ['./loa-editor.component.css']
})
export class LoaEditorComponent {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() yaixm = Object();

  names: string[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.yaixm['loa'] === undefined)
      return;

    let formArray = this.airspaceForm.get('loa') as FormArray;

    for (let loa of this.yaixm['loa']) {
      this.names.push(loa['name']);
      formArray.push(new FormControl(false));
    }
  }
}
