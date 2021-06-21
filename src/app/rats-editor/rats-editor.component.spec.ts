import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatsEditorComponent } from './rats-editor.component';

describe('RatsEditorComponent', () => {
  let component: RatsEditorComponent;
  let fixture: ComponentFixture<RatsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
