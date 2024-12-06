import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_FG2yYZFrc',
            redirectUrl: 'http://localhost:4200/redirect',
            postLogoutRedirectUri: 'http://localhost:4200/logout',
            clientId: '1s6o9ut1ajuqqbenev2k0i5r3m',
            scope: 'email openid phone',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            renewTimeBeforeTokenExpiresInSeconds: 30,
            logLevel: 0, // Debugging level
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule { }
