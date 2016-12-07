import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import ol from 'openlayers';
import {addLocaleData, IntlProvider} from 'react-intl';
global.IntlProvider = IntlProvider;
import Globe from 'boundless-sdk/components/Globe';
import QGISPrint from 'boundless-sdk/components/QGISPrint';
import Zoom from 'boundless-sdk/components/Zoom';
import Rotate from 'boundless-sdk/components/Rotate';
import HomeButton from 'boundless-sdk/components/HomeButton';
import MapPanel from 'boundless-sdk/components/MapPanel';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import LayerList from 'boundless-sdk/components/LayerList';
import injectTapEventPlugin from 'react-tap-event-plugin';
import enLocaleData from 'react-intl/locale-data/en.js';
import InfoPopup from 'boundless-sdk/components/InfoPopup';
import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import Navigation from 'boundless-sdk/components/Navigation';
import enMessages from 'boundless-sdk/locale/en.js';
global.enMessages = enMessages;

import './css/app.css'
import 'boundless-sdk/dist/css/components.css';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var printLayouts = [{
  name: 'Layout 1',
  width: 420.0,
  elements: [{
    name: 'Title',
    height: 40.825440467359044,
    width: 51.98353115727002,
    y: 39.25222551928783,
    x: 221.77507418397624,
    font: 'Helvetica',
    type: 'label',
    id: '24160ce7-34a3-4f25-a077-8910e4889681',
    size: 18
  }, {
    height: 167.0,
    width: 171.0,
    grid: {
      intervalX: 0.0,
      intervalY: 0.0,
      annotationEnabled: false,
      crs: ''
    },
    y: 19.0,
    x: 16.0,
    type: 'map',
    id: '3d532cb9-0eca-4e50-9f0a-ce29b1c7f5a6'
  }],
  height: 297.0
}];

addLocaleData(
  enLocaleData
);

var map = new ol.Map({
  controls: [new ol.control.Attribution({collapsible: false}), new ol.control.ScaleLine()],
  layers: [
    new ol.layer.Tile({title: 'OpenStreetMap', source: new ol.source.OSM()})
  ],
  view: new ol.View({center: [0, 0], zoom: 3})
});

class GeoNodeViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      errorOpen: false
    };
  }
  updateMap(props) {
    if (props.config) {
      var errors = [];
      var filteredErrors = [];
      MapConfigService.load(MapConfigTransformService.transform(props.config, props.proxy, errors), map);
      for (var i = 0, ii = errors.length; i < ii; ++i) {
        // ignore the empty baselayer since we have checkbox now for base layer group
        if (errors[i].layer.type !== 'OpenLayers.Layer') {
          if (window.console && window.console.warn) {
            window.console.warn(errors[i]);
          }
          filteredErrors.push(errors[i]);
        }
      }
      this.setState({
        errors: filteredErrors,
        errorOpen: true
      });
    }
  }
  componentWillMount() {
    this.updateMap(this.props);
    this.mode = this.props.mode || 'viewer';
    this.edit = (this.mode === 'composer');
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
  componentWillReceiveProps(props) {
    this.updateMap(props);
  }
  _handleRequestClose() {
    this.setState({
      errorOpen: false
    });
  }
  render() {
    var error;
    if (this.state.errors.length > 0) {
      var msg = '';
      for (var i = 0, ii = this.state.errors.length; i < ii; i++) {
        msg += this.state.errors[i].msg + '. ';
      }
      error = (<Snackbar
        autoHideDuration={5000}
        open={this.state.errorOpen}
        message={msg}
        onRequestClose={this._handleRequestClose.bind(this)}
      />);
    }
    let layerList = undefined;
    if(this.edit) {
      layerList = {
        sources: this.props.addLayerSources,
        allowUserInput: true
      };
    }
    return (
       <div id='content'>
        {error}
        <MapPanel useHistory={true} id='map' map={map} />
        <div id='globe-button'><Globe tooltipPosition='right' map={map} /></div>
        <div id='print-button'><QGISPrint menu={false} map={map} layouts={printLayouts} /></div>
        <div id='home-button'><HomeButton tooltipPosition='right' map={map} /></div>
        <div><LayerList addLayer={layerList} showTable={true} allowReordering={true} includeLegend={true} allowRemove={this.edit} tooltipPosition='left' allowStyling={this.edit} map={map} /></div>
        <div id='zoom-buttons'><Zoom tooltipPosition='right' map={map} /></div>
        <div id='rotate-button'><Rotate autoHide={true} tooltipPosition='right' map={map} /></div>
        <div id='popup' className='ol-popup'><InfoPopup toggleGroup='navigation' toolId='nav' infoFormat='application/vnd.ogc.gml' map={map} /></div>
      </div>
    );
  }
}

GeoNodeViewer.props = {
  config: React.PropTypes.object,
  proxy: React.PropTypes.string,
  mode: React.PropTypes.string,
  addLayerSources: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
  }))
};

GeoNodeViewer.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default GeoNodeViewer;
global.GeoNodeViewer = GeoNodeViewer;
