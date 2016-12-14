import React from 'react';
import ReactDOM from 'react-dom';
import GeonodeComposer from './components/geonodeLink';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import {setServer} from './reducers/actions'

const store = configureStore()

class Composer {
  constructor(domId, server) {
    this._domId = domId;
    this._mapConfig = undefined;
    this._server = server;
    this._proxy = undefined;
  }
  set server(value) {
    this._server = value;
  }
  set mapConfig(value) {
    this._mapConfig = value;
  }
  set proxy(value) {
    this._proxy = value;
  }
  compose(layerSources) {
    store.dispatch(setServer(this._server));
    ReactDOM.render(<Provider store={store}><IntlProvider locale='en' messages={enMessages}><GeonodeComposer addLayerSources={layerSources} mode='composer' config={this._mapConfig} proxy={this._proxy} /></IntlProvider></Provider>, document.getElementById(this._domId));
  }
  view() {
    let layerSources = [
      {
        title: 'Test',
        url: 'http://exchange-dev.boundlessps.com/geoserver/wms',
        type: 'WMS'
      }
    ];
    ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><GeoNodeViewer server={this._server} addLayerSources={layerSources} mode='composer' config={this._mapConfig} proxy={this._proxy} /></IntlProvider>, document.getElementById(this._domId));
  }
}

module.exports = Composer;
