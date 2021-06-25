import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveEditorComponent } from './wave-editor.component';

describe('WaveEditorComponent', () => {
  let component: WaveEditorComponent;
  let fixture: ComponentFixture<WaveEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
