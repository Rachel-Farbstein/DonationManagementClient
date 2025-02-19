import { Injectable } from '@angular/core';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'eu-north-1_AgABpcbYR',
    ClientId: '52v26ef7fpqptkem75pfnu5v51'
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    signIn(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({
                Username: username,
                Password: password
            });

            const userData = {
                Username: username,
                Pool: userPool
            };

            const cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(result);
                },
                onFailure: err => {
                    reject(err);
                }
            });
        });
    }
}
