import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberConstantComponent } from './chamber-constant.component';

describe('ChamberConstantComponent', () => {
  let component: ChamberConstantComponent;
  let fixture: ComponentFixture<ChamberConstantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamberConstantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamberConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
