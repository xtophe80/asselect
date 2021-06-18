import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-airspace-editor',
  templateUrl: './airspace-editor.component.html',
  styleUrls: ['./airspace-editor.component.css']
})
export class AirspaceEditorComponent {

  atz = [
    { id: 'classd', name: 'Class D' },
    { id: 'ctr', name: 'Control Zone'}
  ]

  ils = [
    { id: 'atz', name: 'As ATZ' },
    { id: 'classf', name: 'Class F'},
    { id: 'classg', name: 'Class G'}
  ]

  maxlevel = [
    { id: 'unlimited', name: 'Unlimited' },
    { id: 'fl195', name: 'FL195'},
    { id: 'fl125', name: 'FL125'},
    { id: 'fl105', name: 'FL105'},
    { id: 'fl65', name: 'FL65'}
  ]

  airspaceForm = this.fb.group({
    airspace: this.fb.group({
      atz: ['classd'],
      ils: ['classf']
    }),
    options: this.fb.group({
      maxlevel: ['unlimited']
    })
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.airspaceForm.value);
  }
}
