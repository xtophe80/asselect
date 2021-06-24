import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaEditorComponent } from './loa-editor.component';

describe('LoaEditorComponent', () => {
  let component: LoaEditorComponent;
  let fixture: ComponentFixture<LoaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
