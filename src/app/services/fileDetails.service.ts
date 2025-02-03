import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FileIdDonationIdDonorName } from '../models/fileDetails-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDetailsService {

  constructor(private httpClient: HttpClient) {
  }

  private url: string = environment.apiBaseUrl + '/files';

  getFileIdsDonorsName(): Observable<FileIdDonationIdDonorName[]> {
    return this.httpClient.get<FileIdDonationIdDonorName[]>(`${this.url}/get-fileids-donors-name`);
  }
}
