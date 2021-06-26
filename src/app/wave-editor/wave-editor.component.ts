import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wave-editor',
  templateUrl: './wave-editor.component.html',
  styleUrls: ['./wave-editor.component.css']
})
export class WaveEditorComponent implements OnChanges {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // Get stored values
    let value = localStorage.getItem('wave');
    if (typeof(value) === 'string') {

      // Get array of Wave boxes
      let waves = JSON.parse(value);
      let waveArray = this.airspaceForm.get('wave') as FormArray;

      waves.forEach((wave: string) => {
        let i = this.names.indexOf(wave);
        if (i !== -1) {
          waveArray.at(i).setValue(true);
        }
      })
    }
  }

  clearall() {
    let waveArray = this.airspaceForm.get('wave') as FormArray;
    waveArray.reset();
  }
}
