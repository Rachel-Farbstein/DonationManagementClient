import { Injectable } from '@angular/core';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
// import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userPool = new CognitoUserPool({
        UserPoolId: 'eu-north-1_BInmkuf6F',
        ClientId: '6pijc2mjedsj94884qfgvh0m1a',
    });

    signIn(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const authDetails = new AuthenticationDetails({
                Username: username,
                Password: password,
            });

            const userData = {
                Username: username,
                Pool: this.userPool,
            };

            const cognitoUser = new CognitoUser(userData);

            cognitoUser.authenticateUser(authDetails, {
                onSuccess: (result) => {
                    const token = result.getAccessToken().getJwtToken();
                    resolve(token);
                },
                onFailure: (err) => {
                    reject(err.message || JSON.stringify(err));
                },
            });
        });
    }
}
