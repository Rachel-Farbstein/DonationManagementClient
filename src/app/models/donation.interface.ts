import { Donor } from "./donor.interface"

export interface Donation {
    donationId: number,
    donorId: number,
    donationDate: Date,
    amount: number,
    paymentType: PaymentType,
    notes?: string
}

export interface DonationWithDonorNameDto {
    donation: Donation,
    donorName: string
}

export enum PaymentType {
    BankTransfer = 1,
    StandingOrder = 2,
    Cash = 3,
    Check = 4,
    CreditCard = 5
}

export const PaymentTypeOptions: { [key: number]: string } = {
    [PaymentType.BankTransfer]: 'העברה בנקאית',
    [PaymentType.StandingOrder]: 'הוראת קבע',
    [PaymentType.Cash]: 'מזומן',
    [PaymentType.Check]: "צ'ק",
    [PaymentType.CreditCard]: 'אשראי'
};