import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {

    private apiUrl: string = 'https://localhost:44387/api/files';

    constructor(private http: HttpClient) { }

    uploadFile(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(this.apiUrl, formData);
    }
}