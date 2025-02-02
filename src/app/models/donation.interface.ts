import { Donor } from "./donor.interface"
import { FileDetails } from "./fileDetails-interface";

export interface Donation {
    donationId: number,
    donorId: number,
    fileId?: number,
    donationDate: Date,
    amount: number,
    paymentType: PaymentType,
    notes?: string,
    file?: File,
    [key: string]: any;
}

export interface DonationWithDonorNameDto {
    donation: Donation,
    donorName: string,
    fileDetails?: FileDetails
}

export interface TotalAmountMonth {
    monthYear: string,
    totalAmount: number
}

export interface DonorTotalAmount {
    donorId: number,
    donorName: string,
    totalAmount: number
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