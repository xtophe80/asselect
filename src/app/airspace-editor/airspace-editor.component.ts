import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-airspace-editor',
  templateUrl: './airspace-editor.component.html',
  styleUrls: ['./airspace-editor.component.css']
})
export class AirspaceEditorComponent implements OnInit, OnChanges {

  @Input() yaixm: any;
  @Input() airspaceForm: FormGroup = new FormGroup({});

  atz = [
    { id: 'classd', name: 'Class D' },
    { id: 'ctr', name: 'Control Zone'}
  ];

  ils = [
    { id: 'atz', name: 'As ATZ' },
    { id: 'classf', name: 'Class F'},
    { id: 'classg', name: 'Class G'}
  ];

  unlicensedAirfield = [
    { id: 'exclude', name: 'Exclude' },
    { id: 'classf', name: 'Class F'},
    { id: 'classg', name: 'Class G'}
  ];

  glidingAirfield = [
    { id: 'exclude', name: 'Exclude' },
    { id: 'gsec', name: 'Gliding Sector' },
    { id: 'classf', name: 'Class F'},
    { id: 'classg', name: 'Class G'}
  ];

  microlightAirfield = [
    { id: 'exclude', name: 'Exclude' },
    { id: 'classf', name: 'Class F'},
    { id: 'classg', name: 'Class G'}
  ];

  hirtaGvs = [
    { id: 'exclude', name: 'Exclude' },
    { id: 'include', name: 'Include'}
  ];

  obstacle = [
    { id: 'exclude', name: 'Exclude' },
    { id: 'include', name: 'Include'}
  ];

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

  glidingSites: string[] = ['None'];

  constructor() {}

  ngOnInit() {
    let value = localStorage.getItem('airspace');
    if (typeof(value) === 'string') {
      let settings = JSON.parse(value);

      let asGroup = this.airspaceForm.get('airspace') as FormGroup;
      for (let control in asGroup.controls) {
        asGroup.get(control)?.setValue(settings[control]);
      }
    }

    value = localStorage.getItem('options');
    if (typeof(value) === 'string') {
      let settings = JSON.parse(value);

      let optGroup = this.airspaceForm.get('options') as FormGroup;
      for (let control in optGroup.controls) {
        optGroup.get(control)?.setValue(settings[control]);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.yaixm === undefined) {
      return;
    }

    if (this.yaixm !== undefined) {
    this.glidingSites = this.yaixm['airspace']
      .filter((x: any) => x['localtype'] === 'GLIDER' &&
                         x['type'] === 'OTHER')
      .map((x: any) => x['name']);
    this.glidingSites.unshift('None');
    }
  }
}
