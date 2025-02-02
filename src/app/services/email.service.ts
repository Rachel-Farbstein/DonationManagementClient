import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EmailService {

    private apiUrl = environment.apiBaseUrl;

    constructor(private httpClient: HttpClient) { }

    sendEmail(toEmail: string, subject: string, body: string, file: File) {
        const formData = new FormData();
        formData.append('toEmail', toEmail);
        formData.append('subject', subject);
        formData.append('body', body);
        if (file) {
            formData.append('file', file);
        }

        return this.httpClient.post(`${this.apiUrl}/send`, formData);
    }
}
