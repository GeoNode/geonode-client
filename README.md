# ol3-react-geonode [![Build Status](https://travis-ci.org/GeoNode/geonode-viewer.svg?branch=master)](https://travis-ci.org/GeoNode/geonode-viewer) [![Code Climate](https://codeclimate.com/github/GeoNode/geonode-viewer/badges/gpa.svg)](https://codeclimate.com/github/GeoNode/geonode-viewer) [![Test Coverage](https://codeclimate.com/github/GeoNode/geonode-viewer/badges/coverage.svg)](https://codeclimate.com/github/GeoNode/geonode-viewer/coverage)
OL3 - React map viewer for GeoNode

## Installation

Install `node` and `npm`. We would encourage you to use [nvm](https://github.com/creationix/nvm) a version manager for node.

You need `node > 5`

Run `npm install` to install all dependencies.

## Development Server

Run `node start` to start the development server. Visit your browser at `http://localhost:3000` to see the result.

## Testing

During development run `npm run test:watch` to run tests on every file change.  

Run `npm test` to run the full test suite with code coverage report.  

## Deployment to GH-pages

Automated deployment via travis is enabled for the master branch. 

If you want to deploy manually to gh-pages use `npm run deploy`

### Important
The deplyoment uses the `index-gh.html` please keep this file in sync with `index.html` and change the path once the repo changes it's name. The `.travis.yml` needs to be changed as well.
