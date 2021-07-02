import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loa-editor',
  templateUrl: './loa-editor.component.html',
  styleUrls: ['./loa-editor.component.css']
})
export class LoaEditorComponent implements OnChanges {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = [];

  ngOnChanges(): void {
    // Get stored values
    const value = localStorage.getItem('loa');
    if (typeof(value) === 'string') {

      // Get array of LOAs
      const loas = JSON.parse(value);
      const loaArray = this.airspaceForm.get('loa') as FormArray;

      loas.forEach((loa: string) => {
        const i = this.names.indexOf(loa);
        if (i !== -1) {
          loaArray.at(i).setValue(true);
        }
      });
    }
  }

  clearall(): void {
    const loaArray = this.airspaceForm.get('loa') as FormArray;
    loaArray.reset();
  }
}
