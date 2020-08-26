import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerconstantComponent } from './beerconstant.component';

describe('BeerconstantComponent', () => {
  let component: BeerconstantComponent;
  let fixture: ComponentFixture<BeerconstantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerconstantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerconstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
