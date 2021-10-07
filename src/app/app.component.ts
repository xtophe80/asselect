import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { PromptUpdateService } from './prompt-update.service';

import { YaixmService } from './yaixm.service';
import { convert } from './yaixm';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  yaixm = {};

  airac = "";

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
    maxLevel: '66000',
    radioFreqs: 'no',
    north: '59',
    south: '49',
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

  ngOnInit(): void {
    this.getYaixm();
  }

  getYaixm(): void {
    this.yaixmService.getYaixm().subscribe(yaixm => {
      this.yaixm = yaixm;

      // Set AIRAC date
      this.airac = yaixm.release.airac_date.substr(0, 10);

      // Get RATs
      this.ratNames = yaixm.rat.map((x: any) => x.name);

      this.ratFormArray.clear();
      for (let i = 0; i < this.ratNames.length; i++) {
        this.ratFormArray.push(new FormControl(false));
      }

      // Get LOAs
      this.loaNames = yaixm.loa
        .filter((x: any) => x.default !== true)
        .map((x: any) => x.name);
      this.loaNames.sort();

      this.loaFormArray.clear();
      for (let i = 0; i < this.loaNames.length; i++) {
        this.loaFormArray.push(new FormControl(false));
      }

      // Get Wave boxes
      this.waveNames = [];
      this.waveFormArray.clear();
      for (const a of yaixm.airspace) {
        if (a.type === 'D_OTHER' && a.localtype === 'GLIDER') {
          this.waveNames.push(a.name);
          this.waveFormArray.push(new FormControl(false));
        }
      }
      this.waveNames.sort();
    });
  }

  onSubmit(): void {
    const airspace = this.formGroup.get('airspace')?.value;
    localStorage.setItem('airspace', JSON.stringify(airspace));

    const options = this.formGroup.get('options')?.value;
    localStorage.setItem('options', JSON.stringify(options));

    const rats = this.ratNames.filter((e, i) => this.ratFormArray.at(i).value);
    localStorage.setItem('rat', JSON.stringify(rats));

    const loas = this.loaNames.filter((e, i) => this.loaFormArray.at(i).value);
    localStorage.setItem('loa', JSON.stringify(loas));

    const waves = this.waveNames.filter((e, i) => this.waveFormArray.at(i).value);
    localStorage.setItem('wave', JSON.stringify(waves));

    const opts = {
      'airspace': airspace,
      'options': options,
      'rats': rats,
      'loas': loas,
      'waves': waves
    };
    const txt = convert(this.yaixm, opts);

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "uk" + this.airac + ".txt");
  }
}
