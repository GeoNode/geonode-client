import React from 'react';
import ReactDOM from 'react-dom';
import GeoNodeViewer from './geonode.jsx';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';

class Composer {
  constructor(domId, config) {
    this._domId = domId;
    this._mapConfig = config;
    this._proxy = undefined;
  }
  set mapConfig(value) {
    this._mapConfig = value;
  }
  set proxy(value) {
    this._proxy = value;
  }
  compose(layerSources) {
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewer addLayerSources={layerSources} mode='composer' config={this._mapConfig} proxy={this._proxy} /></IntlProvider>, document.getElementById(this._domId));
  }
  view() {
    let layerSources = [
      {
        title: 'Test',
        url: 'http://exchange-dev.boundlessps.com/geoserver/wms',
        type: 'WMS'
      }
    ];
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewer addLayerSources={layerSources} mode='composer' config={this._mapConfig} proxy={this._proxy} /></IntlProvider>, document.getElementById(this._domId));
  }
}

module.exports = Composer;
