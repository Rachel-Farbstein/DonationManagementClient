import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService) { }

    onLogin() {
        this.authService.signIn(this.username, this.password)
            .then((token) => {
                console.log('Login successful! Token:', token);
                // תוכל לשמור את הטוקן ב-Local Storage או להמשיך לתהליך הבא
                localStorage.setItem('authToken', token);
            })
            .catch((error) => {
                console.error('Login failed:', error);
                this.errorMessage = error; // הצג שגיאה למשתמש
            });
    }
}
