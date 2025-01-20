import { Injectable, Optional } from '@angular/core';
import { Donor } from '../models/donor.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { Donation, DonationWithDonorNameDto } from '../models/donation.interface';

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
}
