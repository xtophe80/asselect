import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rats-editor',
  templateUrl: './rats-editor.component.html',
  styleUrls: ['./rats-editor.component.css']
})
export class RatsEditorComponent implements OnChanges {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // Get stored values
    let value = localStorage.getItem('rat');
    if (typeof(value) === 'string') {

      // Get array of RATs
      let rats = JSON.parse(value);
      let ratArray = this.airspaceForm.get('rat') as FormArray;

      rats.forEach((rat: string) => {
        let i = this.names.indexOf(rat);
        if (i !== -1) {
          ratArray.at(i).setValue(true);
        }
      })
    }
  }

  clearall() {
    console.log('clearall');
    let ratArray = this.airspaceForm.get('rat') as FormArray;
    ratArray.reset();
  }
}
