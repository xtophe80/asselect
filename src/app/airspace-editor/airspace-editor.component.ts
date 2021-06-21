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

  maxlevel = [
    { id: 'unlimited', name: 'Unlimited' },
    { id: 'fl195', name: 'FL195'},
    { id: 'fl125', name: 'FL125'},
    { id: 'fl105', name: 'FL105'},
    { id: 'fl65', name: 'FL65'}
  ];

  airspaceForm = this.fb.group({
    airspace: this.fb.group({
      atz: ['classd'],
      ils: ['classf']
    }),
    options: this.fb.group({
      maxlevel: ['unlimited']
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
