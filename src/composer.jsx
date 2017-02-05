import React from 'react';
import ReactDOM from 'react-dom';
import GeonodeComposer from './components/geonodeLink';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {setServerUrl} from './state/server/actions';
import {setMapId, setUserLoggedIn, setCheckLogin} from './state/map/actions';
import {setMapConfig} from './state/mapConfig/actions';

const store = configureStore();

class Composer {
  constructor(domId, options) {
    this._domId = domId;
    this._mapConfig = options.mapConfig;
    this._server = options.server;
    this._proxy = options.proxy;
    this._mapId = options.mapId;
    this._userLoggedIn = options.userLoggedIn || false;
    this._checkLogin = options.checkLogin || false;
    this._printLayouts = options.printLayouts;
    this._theme = options.theme;
    this._baseUrl = options.baseUrl;
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
  compose() {
    store.dispatch(setServerUrl(this._server));
    store.dispatch(setMapId(this._mapId));
    store.dispatch(setMapConfig(this._mapConfig));
    store.dispatch(setCheckLogin(this._checkLogin));
    store.dispatch(setUserLoggedIn(this._userLoggedIn));
    ReactDOM.render(<Provider store={store}><IntlProvider locale='en' messages={enMessages}><GeonodeComposer baseUrl={this._baseUrl} theme={this._theme} printLayouts={this._printLayouts} mode='composer' config={this._mapConfig} proxy={this._proxy} /></IntlProvider></Provider>, document.getElementById(this._domId));
  }
}

module.exports = Composer;
