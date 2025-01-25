import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Receipt, ReceiptAndFileDetails } from '../models/receipt.interface';
import { FileDetails } from '../models/fileDetails-interface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private receiptListSubject = new BehaviorSubject<Receipt[]>([]);
  receiptList$ = this.receiptListSubject.asObservable();

  private receiptAndFileListSubject = new BehaviorSubject<ReceiptAndFileDetails[]>([]);
  receipAndFiletList$ = this.receiptAndFileListSubject.asObservable();

  private url: string = environment.apiBaseUrl + '/receipts';

  constructor(private httpClient: HttpClient) {
  }

  getReceipts(): void {
    this.httpClient.get<Receipt[]>(this.url).subscribe(receipts => {
      this.receiptListSubject.next(receipts);
    });
  }

  getReceiptAndfileDetails(): void {
    var apiUrl = `${this.url}/get-receipts-with-files`;
    this.httpClient.get<ReceiptAndFileDetails[]>(apiUrl).subscribe(receipts => {
      this.receiptAndFileListSubject.next(receipts);
    });
  }


  getFileFromS3(receiptId: number, fileDetails: FileDetails): Observable<Blob> {
    return this.httpClient.get(`${this.url}/${receiptId}/file-s3`, { responseType: 'blob' });
    // .pipe(
    // map((blob) => {
    //   return new File([blob], fileDetails.fileName, {
    //     type: blob.type,
    //   });
    // })
    // );
  }

  deleteReceipt(receiptId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${receiptId}`).pipe(
      tap(() => {
        this.getReceipts();
      })
    );
  }

  deleteReceipts(receiptIds: number[] | undefined): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/delete-receipts`, receiptIds).pipe(
      tap(() => {
        this.getReceipts();
      })
    );
  }

  addReceipt(receipt: Receipt): Observable<Receipt> {
    const formData = new FormData();

    Object.keys(receipt).forEach(key => {
      if (key === 'receiptProductionDate') {
        const dateStr = new Date(receipt.receiptProductionDate).toISOString();
        formData.append(key, dateStr);
      }
      else {
        formData.append(key, receipt[key]);
      }
    });

    return this.httpClient.post<Receipt>(this.url, formData).pipe(
      tap(() => {
        this.getReceipts();
        this.getReceiptAndfileDetails();
      })
    );;
  }

  editReceipt(receipt: Receipt): Observable<Receipt> {
    return this.httpClient.put<Receipt>(this.url + '/' + receipt.receiptId, receipt).pipe(
      tap(() => {
        this.getReceipts();
        this.getReceiptAndfileDetails();
      })
    );;
  }
}
