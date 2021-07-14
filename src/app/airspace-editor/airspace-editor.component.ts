import { Component, Input, OnChanges, OnInit } from '@angular/core';
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

  glidingSites: string[] = ['None'];

  ngOnInit(): void {
    const value = localStorage.getItem('airspace');
    if (typeof(value) === 'string') {
      const settings = JSON.parse(value);

      const asGroup = this.airspaceForm.get('airspace') as FormGroup;
      for (const control in asGroup.controls) {
        asGroup.get(control)?.setValue(settings[control]);
      }
    }
  }

  ngOnChanges(): void {
    if (this.yaixm.airspace !== undefined) {
      this.glidingSites = this.yaixm.airspace
        .filter((x: any) =>
                x['localtype'] === 'GLIDER' && x['type'] === 'OTHER')
        .map((x: any) => x['name'])
        .sort();
      this.glidingSites.unshift('None');
    }
  }
}
