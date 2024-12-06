import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { FileUploadService } from 'src/app/services/fileUpload.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {

  selectedFile: File | null = null;

  constructor(private oidcSecurityService: OidcSecurityService, private fileUploadService: FileUploadService) { }

  logoutHref = "https://eu-north-1fg2yyzfrc.auth.eu-north-1.amazoncognito.com/logout?client_id=1s6o9ut1ajuqqbenev2k0i5r3m&logout_uri=http://localhost:4200/logout";

  logout() {

    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    localStorage.clear();
    sessionStorage.clear();

    this.oidcSecurityService.logoffAndRevokeTokens().subscribe({
      next: () => {
        console.log('Successfully logged out');
        window.location.href = this.logoutHref;
      },
      error: (err) => {
        console.error('Error during logout:', err);
        window.location.href = this.logoutHref;
      },
    });;
  }

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
