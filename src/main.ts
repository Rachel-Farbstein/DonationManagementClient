import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { Amplify } from 'aws-amplify';


// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
// Configure Amplify with the imported configuration

// Configure AWS Amplify with the Cognito settings


// Amplify.configure({
//   Auth: {
//     // region: environment.awsConfig.region,
//     userPoolId: environment.awsConfig.userPoolId,
//     userPoolWebClientId: environment.awsConfig.userPoolWebClientId,
//   }
// });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
