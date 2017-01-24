import React from 'react';
import ReactDOM from 'react-dom';
import GeoNodeViewer from './components/geonode';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';

class Viewer {
  constructor(domId, options) {
    this._domId = domId;
    this._mapConfig = options.mapConfig;
    this._proxy = options.proxy;
    this._zoomToLayer = options.zoomToLayer;
    this._printLayouts = options.printLayouts;
  }
  set mapConfig(value) {
    this._mapConfig = value;
  }
  set proxy(value) {
    this._proxy = value;
  }
  set zoomToLayer(value) {
    this._zoomToLayer = value;
  }
  set printLayouts(value) {
    this._printLayouts = value;
  }
  view() {
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewer printLayouts={this._printLayouts} zoomToLayer={this._zoomToLayer} config={this._mapConfig} proxy={this._proxy} /></IntlProvider>, document.getElementById(this._domId));
  }
}

module.exports = Viewer;
