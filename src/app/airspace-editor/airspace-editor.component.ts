import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {YaixmService } from '../yaixm.service';

@Component({
  selector: 'app-airspace-editor',
  templateUrl: './airspace-editor.component.html',
  styleUrls: ['./airspace-editor.component.css']
})
export class AirspaceEditorComponent implements OnInit {

  yaixm = Object();

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

  airspaceForm = this.fb.group({
    airspace: this.fb.group({
      atz: 'classd',
      ils: 'atz',
      unlicensedAirfield: 'exclude',
      glidingAirfield: 'exclude',
      homeAirfield: 'None',
      microlightAirfield: 'exclude',
      hirtaGvs: 'exclude',
      obstacle: 'exclude',
    }),
    options: this.fb.group({
      maxLevels: 'unlimited',
      radioFreqs: 'no',
      norths: '59',
      souths: '49',
      format: 'openair'
    }),
    rats: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
              private yaixmService: YaixmService) {}

  ngOnInit() {
    this.getYaixm();
  }

  getYaixm() {
    this.yaixmService.getYaixm().subscribe(yaixm => {
      this.yaixm = yaixm;
    })
  }

  onSubmit() {
    console.log(this.airspaceForm.value);
  }
}
