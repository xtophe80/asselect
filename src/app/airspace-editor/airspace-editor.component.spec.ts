import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirspaceEditorComponent } from './airspace-editor.component';

describe('AirspaceEditorComponent', () => {
  let component: AirspaceEditorComponent;
  let fixture: ComponentFixture<AirspaceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirspaceEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirspaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
