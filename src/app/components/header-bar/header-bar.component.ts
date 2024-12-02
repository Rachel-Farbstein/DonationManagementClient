import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/fileUpload.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  selectedFile: File | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe({
        next: (response) => console.log('File uploaded successfully:', response),
        error: (err) => console.error('File upload failed:', err),
      });
    }
  }

}
