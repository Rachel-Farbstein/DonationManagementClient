import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FileDetails, FileIdDonationIdDonorName } from 'src/app/models/fileDetails-interface';
import { FileDetailsService } from 'src/app/services/fileDetails.service';
import { FileS3Service } from 'src/app/services/fileS3.service';

@Component({
  selector: 'app-files-receipts',
  templateUrl: './files-receipts.component.html',
  styleUrls: ['./files-receipts.component.scss']
})
export class FilesReceiptsComponent implements OnInit {

  constructor(private fileDetailsService: FileDetailsService,
    private fileS3Service: FileS3Service,
    // private messageService: MessageService
  ) {

  }

  fileIdDonorNameList: FileIdDonationIdDonorName[] = [];

  ngOnInit(): void {
    this.fileDetailsService.getFileIdsDonorsName().subscribe(
      {
        next: (files) => {
          this.fileIdDonorNameList = files;
        },
        error: (err) => {
          console.log('error in get files:', err);
        }
      }
    );
  }

  viewFile(fileDetails: FileDetails, index: number): void {

    const fileUrl = this.fileS3Service.getFileFromCache(fileDetails.s3FileKey);
    if (fileUrl)
      window.open(fileUrl, '_blank');
    else {
      this.fileIdDonorNameList[index].isLoading = true;
      this.fileIdDonorNameList[index].isLoading = true;
      this.fetchFileFromS3(fileDetails).subscribe(
        {
          next: (file: File) => {
            const fileUrl = URL.createObjectURL(file);
            this.fileS3Service.addFileToCache(fileDetails.s3FileKey, fileUrl);
            this.fileIdDonorNameList[index].isLoading = false;
            window.open(fileUrl, '_blank');
          },
          error: () => {
            this.fileIdDonorNameList[index].isLoading = false;
            // this.messageService.add({ severity: 'error', summary: 'נכשל', detail: 'קובץ לא נמצא', life: 3000 });
          }
        }
      );
    }

  }

  fetchFileFromS3(fileDetails: FileDetails): Observable<File> {
    return this.fileS3Service.fetchFileFromS3(fileDetails);
  }

}
