import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    userInfo: any;
    user: User | undefined;

    private url: string = environment.apiBaseUrl + '/users';
    logoutHref: string = environment.logoutHref;

    constructor(private oidcSecurityService: OidcSecurityService, private httpClient: HttpClient) { }

    isAuthenticated(): Observable<boolean> {
        return this.oidcSecurityService.checkAuth().pipe(
            map((result) => result.isAuthenticated)
        );
    }

    setUserInfo() {
        this.oidcSecurityService.getUserData().subscribe(
            userInfo => {
                this.userInfo = userInfo;
                this.user = {
                    id: 0,
                    cognitoUserId: userInfo.sub,
                    cognitoUserName: userInfo.username,
                    Email: userInfo.email,
                    phone: userInfo.phone,
                    isActive: true
                };
                let act = this.addUser(this.user).subscribe(
                    {
                        next(user) { console.log("User Added", user, "act = ", act) },
                        error(error) { console.log("Error at User Added", error, "act = ", act) }
                    }
                );
            }
        )
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.url, user);
    }

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

}
