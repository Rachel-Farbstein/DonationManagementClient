import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Donation, DonationWithDonorNameDto, DonorTotalAmount, PaymentType, TotalAmountMonth } from '../models/donation.interface';
import { FileDetails } from '../models/fileDetails-interface';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private donationListSubject = new BehaviorSubject<DonationWithDonorNameDto[]>([]);
  donationList$ = this.donationListSubject.asObservable();

  donationList!: DonationWithDonorNameDto[];
  private url: string = environment.apiBaseUrl + '/donations';

  constructor(private httpClient: HttpClient) {
  }

  // getDonations(): void {
  //   this.httpClient.get<Donation[]>(this.url).subscribe(donations => {
  //     this.donationListSubject.next(donations);
  //   });
  // }

  getDonations(): void {
    this.httpClient.get<DonationWithDonorNameDto[]>(`${this.url}/get-donations-with-donors`)
      .subscribe(donations => {
        this.donationListSubject.next(donations)
      });
  }

  // getDonationsWithDonorName(): Observable<DonationWithDonorNameDto[]> {
  //   return this.httpClient.get<DonationWithDonorNameDto[]>(`${this.url}/get-donations-with-donors`);
  // }

  deleteDonation(donationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${donationId}`).pipe(
      tap(() => {
        this.getDonations();
      })
    );
  }

  deleteDonations(donationds: number[] | undefined): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/delete-donations`, donationds).pipe(
      tap(() => {
        this.getDonations();
      })
    );
  }

  getNextId(): Observable<number> {
    return this.httpClient.get<number>(this.url + 'api/donation/getNextId');
  }

  addDonation(donation: Donation): Observable<Donation> {
    return this.httpClient.post<Donation>(this.url, donation).pipe(
      tap(() => {
        this.getDonations();
      })
    );;
  }

  editDonation(donation: Donation): Observable<Donation> {
    return this.httpClient.put<Donation>(this.url + '/' + donation.donationId, donation).pipe(
      tap(() => {
        this.getDonations();
      })
    );;
  }

  addFileToDonation(donationId: number, file: File): Observable<FileDetails> {
    const formData = new FormData();
    const donation: Donation = {
      donationId: donationId,
      donorId: 0,
      donationDate: new Date(),
      amount: 0,
      paymentType: PaymentType.BankTransfer,
      file: file,
    }
    Object.keys(donation).forEach(key => {
      if (key === 'donationDate') {
        const dateStr = new Date(donation.donationDate).toISOString();
        formData.append(key, dateStr);
      }
      else {
        formData.append(key, donation[key]);
      }
    });
    return this.httpClient.put<FileDetails>(`${this.url}/add-file-do-donation`, formData);
  }

  deleteDonationFile(donationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${donationId}/delete-donation-file`);
  }

  getAmountForMonth(): Observable<TotalAmountMonth[]> {
    return this.httpClient.get<TotalAmountMonth[]>(`${this.url}/amount-by-month`);
  }

  getAmountForDonors(): Observable<DonorTotalAmount[]> {
    return this.httpClient.get<DonorTotalAmount[]>(`${this.url}/amount-for-donors`);
  }
}
