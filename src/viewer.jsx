import React from 'react';
import ReactDOM from 'react-dom';
import GeoNodeViewer from './geonode.jsx';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';

class Viewer {
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
  view() {
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewer config={this._mapConfig} proxy={this._proxy} /></IntlProvider>, document.getElementById(this._domId));
  }
}

export default Viewer;
