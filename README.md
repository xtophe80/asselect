# ASSelect

The Angular application for the asselect.uk web site.

## Deploy

ASSelect is deployed using GitHub pages:

    npm run ng deploy

The deploy configuration (including domain name) is set in angular.json.

## Airspace update

Update src/assets/yaixm.json and deploy as above.

## NOTAMs

ASSelect links to NOTAM data on Dropbox. See
https://github.com/ahsparrow/navplot2 for details.

## Developing

Install npm packages from the source code top level directory):

    npm install

Run the application:

    npm run ng serve
