import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { YaixmService } from '../yaixm.service';

@Component({
  selector: 'app-wave-editor',
  templateUrl: './wave-editor.component.html',
  styleUrls: ['./wave-editor.component.css']
})
export class WaveEditorComponent {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() yaixm = Object();

  names: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.yaixm['airspace'] === undefined)
      return;

    let formArray = this.airspaceForm.get('wave') as FormArray;

    for (let a of this.yaixm['airspace']) {
      if (a['type'] === 'D_OTHER' && a['localtype'] === 'GLIDER') {
        this.names.push(a['name']);
        formArray.push(new FormControl(false));
      }
    }
    this.names.sort();
  }
}
