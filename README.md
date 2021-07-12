# ASSelect

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Deploy

ASSelect is deployed using GitHub pages:

    npm run ng deploy

deploy configuration (including domain name) is set in angular.json.

## Airspace update

Update src/assets/yaixm.json, git commit and deploy as above.

## NOTAMs

ASSelect retreives NOTAM data from MongoDB. See
https://github.com/ahsparrow/navplot2 for details.

## Build

Install node.js from https://node.org and set PATH to include <install-dir>/bin

Install npm packages:

    npm install

Run the application:

    npm run ng serve
