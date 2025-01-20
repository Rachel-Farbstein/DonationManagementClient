export interface Receipt {
    receiptId: number,
    donationId: number,
    receiptProductionDate: Date,
    file?: File,
    [key: string]: any;
}
