import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsGridComponent } from './reports-grid.component';

describe('ReportsGridComponent', () => {
  let component: ReportsGridComponent;
  let fixture: ComponentFixture<ReportsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
