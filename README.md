# ASSelect

The Angular application for the asselect.uk web site.

## Deploy

ASSelect is deployed using GitHub pages:

    npm run ng deploy

The deploy configuration (including domain name) is set in angular.json.

## Airspace update

Update src/assets/yaixm.json, git commit and deploy as above.

## NOTAMs

ASSelect retreives NOTAM data from a MongoDB Atlas database. See
https://github.com/ahsparrow/navplot2 for details.

## Developing

Install node.js from https://node.org and add \<install-dir\>/bin to PATH.

Install npm packages from the source code top level directory):

    npm install

Run the application:

    npm run ng serve
