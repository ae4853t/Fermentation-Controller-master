import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BeerProfileComponent } from './beer-profile.component';

describe('BeerProfileComponent', () => {
  let component: BeerProfileComponent;
  let fixture: ComponentFixture<BeerProfileComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerProfileComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BeerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
