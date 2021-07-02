import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wave-editor',
  templateUrl: './wave-editor.component.html',
  styleUrls: ['./wave-editor.component.css']
})
export class WaveEditorComponent implements OnChanges {

  @Input() airspaceForm: FormGroup = new FormGroup({});
  @Input() names: string[] = [];

  ngOnChanges(): void {
    // Get stored values
    const value = localStorage.getItem('wave');
    if (typeof(value) === 'string') {

      // Get array of Wave boxes
      const waves = JSON.parse(value);
      const waveArray = this.airspaceForm.get('wave') as FormArray;

      waves.forEach((wave: string) => {
        const i = this.names.indexOf(wave);
        if (i !== -1) {
          waveArray.at(i).setValue(true);
        }
      });
    }
  }

  clearall(): void {
    const waveArray = this.airspaceForm.get('wave') as FormArray;
    waveArray.reset();
  }
}
