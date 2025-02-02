import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { FileDetails } from '../models/fileDetails-interface';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileS3Service {

    private fileCache: { [key: string]: string } = {};
    private fileTimestamps: { [key: string]: number } = {}; // זמן הוספה למטמון

    apiUrl: string = environment.apiBaseUrl + '/files';;

    constructor(private httpClient: HttpClient) {
    }


    fetchFileFromS3(fileDetails: FileDetails): Observable<File> {
        const params = new HttpParams()
            .set('bucketName', fileDetails.s3BucketName)
            .set('key', fileDetails.s3FileKey);
        return this.httpClient.get(`${this.apiUrl}/get-file-from-s3`, { params, responseType: 'blob' })
            .pipe(
                map((blob) => {
                    return new File([blob], fileDetails.fileName, {
                        type: blob.type,
                    });
                })
            );
    }

    addFileToCache(fileKey: string, fileURL: string): void {
        this.fileCache[fileKey] = fileURL;
        this.fileTimestamps[fileKey] = Date.now();
    }

    getFileFromCache(fileKey: string): string | null {
        return this.fileCache[fileKey] || null;
    }

    clearOldFiles(maxAgeInMilliseconds: number): void {
        const currentTime = Date.now();
        for (const [key, fileURL] of Object.entries(this.fileCache)) {
            const fileTimestamp = this.fileTimestamps[key] || 0;
            if (currentTime - fileTimestamp > maxAgeInMilliseconds) {
                URL.revokeObjectURL(fileURL);
                delete this.fileCache[key];
                delete this.fileTimestamps[key];
            }
        }
    }

    clearIfExceedsMaxSize(maxSize: number): void {
        const keys = Object.keys(this.fileCache);
        if (keys.length > maxSize) {
            const filesToDelete = keys.slice(0, keys.length - maxSize);
            for (const key of filesToDelete) {
                URL.revokeObjectURL(this.fileCache[key]);
                delete this.fileCache[key];
                delete this.fileTimestamps[key];
            }
        }
    }

    clearCache(): void {
        for (const fileURL of Object.values(this.fileCache)) {
            URL.revokeObjectURL(fileURL);
        }
        this.fileCache = {};
        this.fileTimestamps = {};
    }
}
