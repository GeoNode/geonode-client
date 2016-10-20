import React from 'react';
import ReactDOM from 'react-dom';
import GeoNodeViewerDebug from './GeonodeDebug.jsx';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';

class Viewer {
  constructor(domId, config) {
    this.domId = domId;
    this.mapConfig = config;
  }
  set config(value) {
    this.mapConfig = config;
  }
  view() {
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewerDebug config={this.mapConfig} /></IntlProvider>, document.getElementById(this.domId));
  }
}

export default Viewer;
