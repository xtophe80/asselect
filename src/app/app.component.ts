import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { PromptUpdateService } from './prompt-update.service'

import { YaixmService } from './yaixm.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  yaixm = undefined;

  airspaceFormGroup = this.fb.group({
    atz: 'classd',
    ils: 'atz',
    unlicensedAirfield: 'exclude',
    glidingAirfield: 'exclude',
    homeAirfield: 'None',
    microlightAirfield: 'exclude',
    hirtaGvs: 'exclude',
    obstacle: 'exclude',
  });

  optionsFormGroup = this.fb.group({
    maxLevels: 'unlimited',
    radioFreqs: 'no',
    norths: '59',
    souths: '49',
    format: 'openair'
  });

  ratFormArray = new FormArray([]);
  loaFormArray = new FormArray([]);
  waveFormArray = new FormArray([]);

  formGroup = this.fb.group({
    airspace: this.airspaceFormGroup,
    options: this.optionsFormGroup,
    rat: this.ratFormArray,
    loa: this.loaFormArray,
    wave: this.waveFormArray
  });

  ratNames: string[] = [];
  loaNames: string[] = [];
  waveNames: string[] = [];

  constructor(private promptUpdateService: PromptUpdateService,
              private yaixmService: YaixmService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.getYaixm();
  }

  getYaixm() {
    this.yaixmService.getYaixm().subscribe(yaixm => {
      this.yaixm = yaixm;

      // Get RATs
      this.ratNames = yaixm['rat'].map((x: any) => x['name']);

      this.ratFormArray.clear();
      for (let i = 0; i < this.ratNames.length; i++) {
        this.ratFormArray.push(new FormControl(false));
      }

      // Get LOAs
      this.loaNames = yaixm['loa']
        .filter((x: any) => x['default'] !== true)
        .map((x: any) => x['name']);

      this.loaFormArray.clear();
      for (let i = 0; i < this.loaNames.length; i++) {
        this.loaFormArray.push(new FormControl(false));
      }

      // Get Wave boxes
      this.waveNames = []
      this.waveFormArray.clear();
      for (let a of yaixm['airspace']) {
        if (a['type'] === 'D_OTHER' && a['localtype'] === 'GLIDER') {
          this.waveNames.push(a['name']);
          this.waveFormArray.push(new FormControl(false));
        }
      }
    })
  }

  onSubmit() {
    localStorage.setItem('airspace',
                         JSON.stringify(this.formGroup.get('airspace')?.value));
    localStorage.setItem('options',
                         JSON.stringify(this.formGroup.get('options')?.value));

    let rats = this.ratNames.filter((e, i) => this.ratFormArray.at(i).value);
    localStorage.setItem('rat', JSON.stringify(rats));

    let loas = this.loaNames.filter((e, i) => this.loaFormArray.at(i).value);
    localStorage.setItem('loa', JSON.stringify(loas));

    let waves = this.waveNames.filter((e, i) => this.waveFormArray.at(i).value);
    localStorage.setItem('wave', JSON.stringify(waves));

    let blob = new Blob(["Hello from ASSelect"],
                        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "openair.txt");
  }
}
