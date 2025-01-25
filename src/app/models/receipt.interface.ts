import { FileDetails } from "./fileDetails-interface";

export interface Receipt {
    receiptId: number,
    donationId: number,
    receiptProductionDate: Date,
    file?: File,
    [key: string]: any;
}

export interface ReceiptAndFileDetails {
    receiptDto: Receipt,
    fileDetailsDto: FileDetails
}
