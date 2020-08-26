import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeConstantComponent } from './fridge-constant.component';

describe('FridgeConstantComponent', () => {
  let component: FridgeConstantComponent;
  let fixture: ComponentFixture<FridgeConstantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridgeConstantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
