import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerConstantComponent } from './beerconstant.component';

describe('BeerConstantComponent', () => {
  let component: BeerConstantComponent;
  let fixture: ComponentFixture<BeerConstantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerConstantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
