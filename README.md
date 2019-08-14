# Setup Development Platform

Project developed using Visual Studio Code.  

This project requires a firebase account and project.  

Install Node version 12.3.1 (includes NPM)  on your development platform.

From command prompt install the Angular CLI. \
npm install -g @angular/cli@8.0.0

##Install Firebase tools.  (tested with version 6.10.0) 
npm install -g firebase-tools

## Login into your Firebase account 
firebase login

## Initialize Firebase
firebase init 

Select the database and hosting modules. \
Set the public directory to 'dist'  \
use the default for all others.\

Check database.rules.json file \
set to the following. \
{ \
  "rules": { \
    ".read": "true", \
    ".write": "true" \
  } \
} 

## Add the FireBase Config to the Project
In the `src/environments` folder add a new file "firebase.config.ts" \
In the firebase project console select Authentication then Web setup. \
Copy the firebase configuration data and insert into the newly created\
firebase.config file.

export const fireBaseConfig = { \
    apiKey: '', \
    authDomain: '', \
    databaseURL: '', \
    projectId: '', \
    storageBucket: '', \
    messagingSenderId: '' \
};

## setup development environment. 
    npm install

# to deploy to firebase
    ng build

    firebase deploy


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
