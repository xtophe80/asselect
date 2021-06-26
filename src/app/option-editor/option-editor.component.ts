import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-option-editor',
  templateUrl: './option-editor.component.html',
  styleUrls: ['./option-editor.component.css']
})
export class OptionEditorComponent implements OnInit {

  @Input() airspaceForm: FormGroup = new FormGroup({});

  maxLevels = [
    { id: 'unlimited', name: 'Unlimited' },
    { id: 'fl195', name: 'FL195'},
    { id: 'fl125', name: 'FL125'},
    { id: 'fl105', name: 'FL105'},
    { id: 'fl65', name: 'FL65'}
  ];

  radioFreqs = [
    { id: 'no', name: 'No' },
    { id: 'append', name: 'Append'}
  ];

  norths = [
    { id: '59', name: 'None' },
    { id: '54.9', name: 'Carlisle' },
    { id: '53.7', name: 'Hull' },
    { id: '52.9', name: 'Nottingham' }
  ];

  souths = [
    { id: '49', name: 'None' },
    { id: '51.8', name: 'Oxford' },
    { id: '52.9', name: 'Nottingham' },
    { id: '53.7', name: 'Hull' },
    { id: '54.9', name: 'Carlisle' }
  ];

  format = [
    { id: 'openair', 'name': 'OpenAir (recommended)' },
    { id: 'tnp', 'name': 'TNP'  },
    { id: 'ratonly', 'name': 'OpenAir, RA(T) only' },
    { id: 'competition', 'name': 'Competition' }
  ];

  constructor() {}

  ngOnInit() {
    let value = localStorage.getItem('options');
    if (typeof(value) === 'string') {
      let settings = JSON.parse(value);

      let optGroup = this.airspaceForm.get('options') as FormGroup;
      for (let control in optGroup.controls) {
        optGroup.get(control)?.setValue(settings[control]);
      }
    }
  }
}
