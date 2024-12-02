import { Injectable, Optional } from '@angular/core';
import { Donor } from '../models/donor.interface';
import { Observable, of } from 'rxjs';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  donorList!: Donor[];
  private url: string = 'https://localhost:44387/api/donors';

  constructor(private httpClient: HttpClient) {
  }

  getDonors(): Observable<Donor[]> {
    return this.httpClient.get<Donor[]>(this.url);
  }

  getNextId(): Observable<number> {
    return this.httpClient.get<number>(this.url + 'api/donors/getNextId');
  }

  addDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.url, donor);
  }

  removeDonor(donorId: number): void {
    // var act: HttpResponse<any>; 
    let act = this.httpClient.delete(this.url + '/' + donorId).subscribe(
      error => {
        console.log("error", act);
      }
    );
    console.log(act);
  }

  removeDonors(donorIds: number[] | undefined): Promise<any> {
    return firstValueFrom(this.httpClient.post(this.url + '/delete-donors', donorIds));
  }

  editDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.put<Donor>(this.url + '/' + donor.id, donor);
  }
}
