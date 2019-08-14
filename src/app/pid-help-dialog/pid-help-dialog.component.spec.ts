import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PidHelpDialogComponent } from './pid-help-dialog.component';

describe('PidHelpDialogComponent', () => {
  let component: PidHelpDialogComponent;
  let fixture: ComponentFixture<PidHelpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PidHelpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PidHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
