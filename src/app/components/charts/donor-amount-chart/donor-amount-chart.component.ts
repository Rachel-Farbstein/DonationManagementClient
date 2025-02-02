import { ChangeDetectorRef, Component } from '@angular/core';
import { DonationService } from 'src/app/services/donation.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-donor-amount-chart',
  templateUrl: './donor-amount-chart.component.html',
  styleUrls: ['./donor-amount-chart.component.scss']
})
export class DonorAmountChartComponent {
  constructor(private cd: ChangeDetectorRef, private donationService: DonationService) {

  }

  donationsData: any;
  totalAmt: number = 0;
  options: any;
  chartDataLabels = ChartDataLabels;

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.donationService.getAmountForDonors().subscribe(data => {

      const donorNamesLabels = data.map(d => d.donorName); // שמות התורמים
      const totalAmountValues = data.map(d => d.totalAmount); // סכומי התרומות
      const colors = this.generateColors(donorNamesLabels.length); // צבעים דינמיים

      console.log("labels:", donorNamesLabels);
      console.log("sum:", totalAmountValues);
      this.totalAmt = totalAmountValues.reduce((sum, donationAmt) => sum + donationAmt, 0)
      this.donationsData = {
        labels: donorNamesLabels,
        datasets: [
          {
            label: 'סך הכל תרומות של התורם',
            data: totalAmountValues,
            backgroundColor: colors,
            borderWidth: 1
          }
        ]
      };

      this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              display: false
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
                family: 'Assistant',
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 700,
                family: 'Assistant',
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };

      // this.options = {

      //   responsive: true,
      //   plugins: {
      //     legend: {
      //       display: true,
      //       position: 'left'
      //     },
      //     datalabels: {
      //       color: '#fff',
      //       font: { weight: 'bold', size: 14 },
      //       formatter: function (value: any, context: any) {
      //         return context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : '';
      //       }
      //     },
      //     tooltip: {
      //       callbacks: {
      //         label: (tooltipItem: any) => {
      //           const total = totalAmountValues.reduce((sum, val) => sum + val, 0);
      //           const value = totalAmountValues[tooltipItem.dataIndex];
      //           const percentage = ((value / total) * 100).toFixed(2);
      //           return `${donorNamesLabels[tooltipItem.dataIndex]}: ${value} ש"ח (${percentage}%)`;
      //         }
      //       }
      //     }

      //   }

      // }

    });

    this.cd.markForCheck()
  }

  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i <= count; i++) {
      const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; // צבע בגוון שונה
      colors.push(color);
    }
    return colors;
  }
}
