import { Injectable, Optional } from '@angular/core';
import { Donor } from '../models/donor.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  private donorListSubject = new BehaviorSubject<Donor[]>([]);
  donorList$ = this.donorListSubject.asObservable();

  donorList!: Donor[];
  private url: string = environment.apiBaseUrl + '/donors';

  constructor(private httpClient: HttpClient) {
  }

  getDonors(): void {
    this.httpClient.get<Donor[]>(this.url).subscribe(donors => {
      this.donorListSubject.next(donors);
    });
  }

  deleteDonor(donorId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${donorId}`).pipe(
      tap(() => {
        // עדכן את הרשימה רק אם המחיקה הצליחה
        this.getDonors();
      })
    );
  }

  deleteDonors(donorIds: number[] | undefined): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/delete-donors`, donorIds).pipe(
      tap(() => {
        this.getDonors();
      })
    );
  }

  getNextId(): Observable<number> {
    return this.httpClient.get<number>(this.url + 'api/donors/getNextId');
  }

  addDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.url, donor).pipe(
      tap(() => {
        this.getDonors();
      })
    );;
  }

  removeDonors(donorIds: number[] | undefined): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.url + '/delete-donors', donorIds).pipe(
      tap(() => {
        this.getDonors();
      })
    ));
  }

  editDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.put<Donor>(this.url + '/' + donor.donorId, donor).pipe(
      tap(() => {
        this.getDonors();
      })
    );;
  }
}
