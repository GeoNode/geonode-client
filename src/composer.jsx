import React from 'react';
import ReactDOM from 'react-dom';
import GeonodeComposer from './components/geonodeLink';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {setServerUrl} from './state/server/actions';
import {setMapId} from './state/map/actions';
import {setMapConfig} from './state/mapConfig/actions';

const store = configureStore();

class Composer {
  constructor(domId, options) {
    this._domId = domId;
    this._mapConfig = options.mapConfig;
    this._server = options.server;
    this._proxy = options.proxy;
    this._mapId = options.mapId;
    this._printLayouts = options.printLayouts;
    this._theme = options.theme;
    this._layer = options.layer;
    this._wmsServer = options.wmsServer;
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
  set mapId(value) {
    this._mapId = value;
  }
  set printLayouts(value) {
    this._printLayouts = value;
  }
  set theme(value) {
    this._theme = value;
  }
  set layer(value) {
    this._layer = value;
  }
  set wmsServer(value) {
    this._wmsServer = value;
  }
  compose(layerSources) {
    store.dispatch(setServerUrl(this._server));
    store.dispatch(setMapId(this._mapId));
    store.dispatch(setMapConfig(this._mapConfig));
    ReactDOM.render(<Provider store={store}><IntlProvider locale='en' messages={enMessages}><GeonodeComposer theme={this._theme} wmsServer={this._wmsServer} layer={this._layer} printLayouts={this._printLayouts} addLayerSources={layerSources} mode='composer' config={this._mapConfig} proxy={this._proxy} /></IntlProvider></Provider>, document.getElementById(this._domId));
  }
}

module.exports = Composer;
