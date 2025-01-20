import { Injectable, Optional } from '@angular/core';
import { Donor } from '../models/donor.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Receipt } from '../models/receipt.interface';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private receiptListSubject = new BehaviorSubject<Receipt[]>([]);
  receiptList$ = this.receiptListSubject.asObservable();

  donorList!: Donor[];
  private url: string = environment.apiBaseUrl + '/receipts';

  constructor(private httpClient: HttpClient) {
  }

  getReceipts(): void {
    this.httpClient.get<Receipt[]>(this.url).subscribe(receipts => {
      this.receiptListSubject.next(receipts);
    });
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
      })
    );;
  }

  editDonor(receipt: Receipt): Observable<Receipt> {
    return this.httpClient.put<Receipt>(this.url + '/' + receipt.receiptId, receipt).pipe(
      tap(() => {
        this.getReceipts();
      })
    );;
  }
}
