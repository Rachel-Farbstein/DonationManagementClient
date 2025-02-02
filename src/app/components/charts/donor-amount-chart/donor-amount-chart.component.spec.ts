import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorAmountChartComponent } from './donor-amount-chart.component';

describe('DonorAmountChartComponent', () => {
  let component: DonorAmountChartComponent;
  let fixture: ComponentFixture<DonorAmountChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorAmountChartComponent]
    });
    fixture = TestBed.createComponent(DonorAmountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
