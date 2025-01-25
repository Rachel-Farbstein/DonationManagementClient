import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileS3Service {

    private fileCache: { [key: string]: string } = {};
    private fileTimestamps: { [key: string]: number } = {}; // זמן הוספה למטמון

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
