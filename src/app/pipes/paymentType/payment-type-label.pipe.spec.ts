import { PaymentTypeLabelPipe } from './payment-type-label.pipe';

describe('PaymentTypeLabelPipe', () => {
  it('create an instance', () => {
    const pipe = new PaymentTypeLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
