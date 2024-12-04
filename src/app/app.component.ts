import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  ngOnInit(): void { }

  constructor(private authService: AuthService) { }

  title = 'DonationManagement';
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isAuthorized: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // login() {
  //   this.authService.signIn(this.username, this.password)
  //     .then((token) => {
  //       console.log('Login successful! Token:', token);
  //       this.isAuthorized = true;
  //       // תוכל לשמור את הטוקן ב-Local Storage או להמשיך לתהליך הבא
  //       localStorage.setItem('authToken', token);
  //     })
  //     .catch((error) => {
  //       console.error('Login failed:', error);
  //       this.errorMessage = error; // הצג שגיאה למשתמש
  //     });
  // }


}
