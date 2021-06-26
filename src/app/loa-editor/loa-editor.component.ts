import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loa-editor',
  templateUrl: './loa-editor.component.html',
  styleUrls: ['./loa-editor.component.css']
})
export class LoaEditorComponent implements OnChanges {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // Get stored values
    let value = localStorage.getItem('loa');
    if (typeof(value) === 'string') {

      // Get array of LOAs
      let loas = JSON.parse(value);
      let loaArray = this.airspaceForm.get('loa') as FormArray;

      loas.forEach((loa: string) => {
        let i = this.names.indexOf(loa);
        if (i !== -1) {
          loaArray.at(i).setValue(true);
        }
      })
    }
  }
}
