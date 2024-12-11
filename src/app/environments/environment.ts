// export const environment = {
//     production: false,
//     awsConfig: {
//         region: 'eu-north-1', // Example: 'us-east-1'
//         userPoolId: 'eu-north-1_BInmkuf6F', // Replace with your Cognito User Pool ID
//         userPoolWebClientId: '6pijc2mjedsj94884qfgvh0m1a', // Replace with your Cognito App Client ID
//     }
// };

export const environment = {
    production: false,
    cognito: {
        userPoolId: 'eu-north-1_BInmkuf6F',
        userPoolWebClientId: '6pijc2mjedsj94884qfgvh0m1a',
        region: 'eu-north-1',
        domain: 'https://eu-north-1binmkuf6f.auth.eu-north-1.amazoncognito.com',
        redirectUri: 'http://localhost:4200/'
    },
    apiBaseUrl: 'https://localhost:44387/api',
};
