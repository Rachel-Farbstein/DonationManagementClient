import { Pipe, PipeTransform } from '@angular/core';
import { PaymentTypeOptions } from 'src/app/models/donation.interface';

@Pipe({
  name: 'paymentTypeLabel'
})
export class PaymentTypeLabelPipe implements PipeTransform {

  transform(value: number): string {
    return PaymentTypeOptions[value] || "unknown";
  }

}
