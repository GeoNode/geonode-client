# geonode-client [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

⛔️ **This project is deprecated and not actively maintained**

OL3 - React map viewer for GeoNode

## Installation

Install `node` and `npm`. We would encourage you to use [nvm](https://github.com/creationix/nvm) a version manager for node.

You need `node > 5`

Run `npm install` to install all dependencies.

## Development Server

Run `npm start` to start the development server. Visit your browser at `http://localhost:8080` to see the result.

## Testing

During development run `npm run test:watch` to run tests on every file change.  

Run `npm test` to run the full test suite with code coverage report.  

## Building

Building is done via webpack and the command is `npm build`  
The dist folder is where the minified versions of these files are stored.  

## Deployment to GH-pages

Automated deployment via travis is enabled for the master branch. 

If you want to deploy manually to gh-pages use `npm run deploy`

### Important
The deplyoment uses the `index-gh.html` please keep this file in sync with `index.html` and change the path once the repo changes it's name. The `.travis.yml` needs to be changed as well.

## Integrating into GeoNode/Django

Add `django-geonode-client` to your requirements.txt
Add `geonode-client` to your `INSTALLED_APPS`

### For GeoNode
Change the `LAYER_PREVIEW_LIBRARY` to `react`

### For Django
We added templatetags you can use in your templates

Add `{% client_viewer_js %}` to include the viewer javasricpt
Add `{% client_composer_js %}` to include the composer javasricpt

The following templates are available:
`client_map_view_html` for the full map view
`client_map_detail_view_html` for a smaller map view (as in the map preview)
`client_map_new_html` create a new map with composer
`client_layer_map_html` smaller map view for the layer preview
