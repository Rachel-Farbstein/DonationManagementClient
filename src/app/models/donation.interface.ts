import { Donor } from "./donor.interface"

export interface Donation {
    donationId: number,
    donorId: string,
    donorName: string,
    donor: Donor,
    donationDate: Date,
    amount: number,
    paymentType: PaymentType
}

export interface DonationDto {
    donationId: number,
    donorId: string,
    donationDate: Date,
    amount: number,
    paymentType: PaymentType
}

export enum PaymentType {
    BankTransfer = '1',
    StandingOrder = '2',
    Cash = '3',
    Check = '4',
    CreditCard = '5'
}