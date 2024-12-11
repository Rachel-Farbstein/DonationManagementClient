export interface Donation {
    donationId: number,
    donorId: string,
    donationDate: Date,
    amount: number,
    paymentType: PaymentType
}

enum PaymentType {
    BankTransfer = '1',
    StandingOrder = '2',
    Cash = '3',
    Check = '4',
    CreditCard = '5'
}