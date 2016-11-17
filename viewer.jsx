import React from 'react';
import ReactDOM from 'react-dom';
import GeoNodeViewer from './geonode.jsx';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';

class Viewer {
  constructor(domId, config) {
    this.domId = domId;
    this.mapConfig = config;
    this.proxy = undefined;
  }
  set config(value) {
    this.mapConfig = value;
  }
  set setProxy(value) {
    this.proxy = value;
  }
  view() {
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewer config={this.mapConfig} proxy={this.proxy} /></IntlProvider>, document.getElementById(this.domId));
  }
}

export default Viewer;
