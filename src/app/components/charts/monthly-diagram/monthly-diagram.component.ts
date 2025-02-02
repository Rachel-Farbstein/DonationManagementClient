import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-monthly-diagram',
  templateUrl: './monthly-diagram.component.html',
  styleUrls: ['./monthly-diagram.component.scss']
})
export class MonthlyDiagramComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private donationService: DonationService) {

  }

  donationsData: any;
  options: any;
  totalAmtLastYear: number = 0;


  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.donationService.getAmountForMonth().subscribe(data => {

      this.totalAmtLastYear = data.reduce((sum, item) => sum + item.totalAmount, 0);

      this.donationsData = {
        labels: data.map(d => d.monthYear),
        datasets: [
          {
            label: 'פילוח תרומות לפי חודש',
            data: data.map(d => d.totalAmount),
            backgroundColor: '#4F46E5',
            barThickness: 30
          }
        ]
      };

    });

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          barPercentage: 0.7,
          categoryPercentage: 1,
          ticks: {
            font: {
              family: 'Assistant',
            },
            color: textColor
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'Assistant',
            },
            color: textColor
          }
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
    };

    this.cd.markForCheck()
  }
}
