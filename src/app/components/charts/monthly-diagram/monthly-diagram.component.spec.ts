import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDiagramComponent } from './monthly-diagram.component';

describe('MonthlyDiagramComponent', () => {
  let component: MonthlyDiagramComponent;
  let fixture: ComponentFixture<MonthlyDiagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyDiagramComponent]
    });
    fixture = TestBed.createComponent(MonthlyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
