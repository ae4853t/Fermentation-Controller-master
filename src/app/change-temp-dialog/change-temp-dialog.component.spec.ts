import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTempDialogComponent } from './change-temp-dialog.component';

describe('ChangeTempDialogComponent', () => {
  let component: ChangeTempDialogComponent;
  let fixture: ComponentFixture<ChangeTempDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTempDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTempDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
