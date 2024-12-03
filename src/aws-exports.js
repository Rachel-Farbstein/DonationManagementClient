import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-north-1',
        userPoolId: 'eu-north-1_BInmkuf6F',
        userPoolWebClientId: '6pijc2mjedsj94884qfgvh0m1a'
    }
});