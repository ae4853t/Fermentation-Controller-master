import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabChangeDialogComponent } from './tab-change-dialog.component';

describe('TabChangeDialogComponent', () => {
  let component: TabChangeDialogComponent;
  let fixture: ComponentFixture<TabChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
