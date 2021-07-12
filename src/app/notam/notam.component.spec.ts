import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotamComponent } from './notam.component';

describe('NotamComponent', () => {
  let component: NotamComponent;
  let fixture: ComponentFixture<NotamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
