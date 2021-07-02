import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rats-editor',
  templateUrl: './rats-editor.component.html',
  styleUrls: ['./rats-editor.component.css']
})
export class RatsEditorComponent implements OnChanges {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = []

  ngOnChanges(): void {
    // Get stored values
    const value = localStorage.getItem('rat');
    if (typeof(value) === 'string') {

      // Get array of RATs
      const rats = JSON.parse(value);
      const ratArray = this.airspaceForm.get('rat') as FormArray;

      rats.forEach((rat: string) => {
        const i = this.names.indexOf(rat);
        if (i !== -1) {
          ratArray.at(i).setValue(true);
        }
      });
    }
  }

  clearall(): void {
    const ratArray = this.airspaceForm.get('rat') as FormArray;
    ratArray.reset();
  }
}
