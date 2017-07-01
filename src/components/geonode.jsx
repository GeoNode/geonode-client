import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import 'core-js/fn/object/assign';
import ol from 'openlayers';
import {addLocaleData, IntlProvider} from 'react-intl';
global.IntlProvider = IntlProvider;
import injectTapEventPlugin from 'react-tap-event-plugin';
import Globe from 'boundless-sdk/components/Globe';
import QGISPrint from 'boundless-sdk/components/QGISPrint';
import Zoom from 'boundless-sdk/components/Zoom';
import Rotate from 'boundless-sdk/components/Rotate';
import HomeButton from 'boundless-sdk/components/HomeButton';
import MapPanel from 'boundless-sdk/components/MapPanel';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import LayerList from 'boundless-sdk/components/LayerList';
import enLocaleData from 'react-intl/locale-data/en.js';
import InfoPopup from 'boundless-sdk/components/InfoPopup';
import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import WMSService from 'boundless-sdk/services/WMSService';
import enMessages from 'boundless-sdk/locale/en.js';
enMessages["loginmodal.helptext"] = "Login to GeoNode";
global.enMessages = enMessages;

import Save from './save';
import MapUrlLink from '../containers/MapUrlLink';
import {getLocalGeoServer} from '../services/geonode';
import {getCRSFToken} from '../helper';

import '../css/app.css'
import 'boundless-sdk/dist/css/components.css';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

addLocaleData(enLocaleData);

var map = new ol.Map({
  controls: [
    new ol.control.Attribution({collapsible: false}),
    new ol.control.ScaleLine()
  ],
  layers: [new ol.layer.Tile({title: 'OSM Streets', type: 'base', source: new ol.source.OSM()})],
  view: new ol.View({
    center: [
      0, 0
    ],
    zoom: 3
  })
});
window.setThumbnail = function(obj_id) {
  map.once('postcompose', function(evt) {
    var canvas = evt.context.canvas;
    canvas.toBlob(function(blob) {
      var url = window.location.pathname.replace('/view', '');

      if (typeof obj_id != 'undefined' && url.indexOf('new')) {
        url = url.replace('new', obj_id);
      }
      url += '/thumbnail/react';
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        fetch(url, {
          method: 'POST',
          credentials: "same-origin",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": getCRSFToken()
          },
          body: JSON.stringify({image: reader.result})
        })
      }

    });
  });
  map.renderSync();

}

class GeoNodeViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileServices: undefined,
      errors: [],
      errorOpen: false
    };
    this._local = getLocalGeoServer(props.config.sources, props.baseUrl);
  }
  getChildContext() {
    return {
      proxy: this.props.proxy,
      requestHeaders: {
        'X-CSRFToken': getCRSFToken()
      },
      muiTheme: getMuiTheme(this.props.theme)
    };
  }
  componentWillMount() {
    this.updateMap(this.props);
    this.mode = this.props.mode || 'viewer';
    this.edit = (this.mode === 'composer');
  }
  componentWillReceiveProps(props) {
    this.updateMap(props);
  }
  updateMap(props) {
    if (props.config) {
      var tileServices = [];
      var errors = [];
      var filteredErrors = [];
      if (props.zoomToLayer && props.config.map.layers[props.config.map.layers.length - 1].bbox) {
        this._extent = props.config.map.layers[props.config.map.layers.length - 1].bbox;
      }
      MapConfigService.load(MapConfigTransformService.transform(props.config, errors, tileServices), map, this.props.proxy);
      for (var i = 0, ii = errors.length; i < ii; ++i) {
        // ignore the empty baselayer since we have checkbox now for base layer group
        // ignore the empty layer from the local source
        if (errors[i].layer.type !== 'OpenLayers.Layer' && errors[i].msg !== 'Unable to load layer undefined') {
          if (window.console && window.console.warn) {
            window.console.warn(errors[i]);
          }
          filteredErrors.push(errors[i]);
        }
      }
      this.setState({errors: filteredErrors, errorOpen: true, tileServices: tileServices});
    }
  }
  _handleRequestClose() {
    this.setState({errorOpen: false});
  }
  _createLayerList() {
    let layerList;
    if (this._local) {
      layerList = {
        sources: [
          {
            title: this._local.title,
            url: this._local.url,
            type: 'WMS'
          }
        ],
        allowUserInput: true
      };
    } else {
      layerList = {
        sources: [
          {
            title: 'Local Geoserver',
            url: this.props.server + '/geoserver/wms',
            type: 'WMS'
          }
        ],
        allowUserInput: true
      };
    }
    return layerList;
  }
  render() {
    var error;
    if (this.state.errors.length > 0) {
      var msg = '';
      for (var i = 0, ii = this.state.errors.length; i < ii; i++) {
        msg += this.state.errors[i].msg + '. ';
      }
      error = (<Snackbar autoHideDuration={5000} open={this.state.errorOpen} message={msg} onRequestClose={this._handleRequestClose.bind(this)}/>);
    }
    let layerList,
      save,
      mapUrl;
    if (this.edit) {
      layerList = this._createLayerList();
      if (this.props.server) {
        save = (
          <div id='save-button' className='geonode-save'><Save map={map}/></div>
        );
        mapUrl = (<MapUrlLink/>);
      }
    }
    return (
      <div id='content'>
        {error}
        <MapPanel useHistory={true} id='map' map={map} extent={this._extent}/>
        <div id='globe-button'><Globe tooltipPosition='right' map={map}/></div>
        <div id='print-button'><QGISPrint menu={false} map={map} layouts={this.props.printLayouts}/></div>
        <div id='home-button'><HomeButton extent={this._extent} tooltipPosition='right' map={map}/></div>
        <div><LayerList showZoomTo={true} addBaseMap={{
        tileServices: this.state.tileServices
      }} addLayer={layerList} showTable={true} allowReordering={true} includeLegend={true} allowRemove={this.edit} tooltipPosition='left' allowStyling={this.edit || this.props.zoomToLayer} map={map}/></div>
        <div id='zoom-buttons'><Zoom tooltipPosition='right' map={map}/></div>
        <div id='rotate-button'><Rotate autoHide={true} tooltipPosition='right' map={map}/></div>
        <div id='popup' className='ol-popup'><InfoPopup toggleGroup='navigation' toolId='nav' infoFormat='application/vnd.ogc.gml' map={map}/></div>
        {save}
        {mapUrl}
      </div>
    );
  }
}

GeoNodeViewer.props = {
  config: React.PropTypes.object,
  loadMapConfig: React.PropTypes.bool,
  proxy: React.PropTypes.string,
  theme: React.PropTypes.object,
  mode: React.PropTypes.string,
  server: React.PropTypes.string,
  printLayouts: React.PropTypes.array
};

GeoNodeViewer.defaultProps = {
  theme: {
    floatingActionButton: {
      iconColor: '#fff',
      color: '#2c689c'
    },
    toolbar: {
      backgroundColor: '#333'
    },
    palette: {
      primary1Color: '#2c689c',
      primary2Color: '#2c689c',
      primary3Color: '#2c689c',
      accent1Color: '#2c689c',
      accent2Color: '#2c689c',
      accent3Color: '#2c689c',
      textColor: '#2E506D',
      secondaryTextColor: '#fff',
      alternateTextColor: '#fff',
      canvasColor: '#fff'
    }
  },
  printLayouts: [
    {
      "width": 297.0,
      "elements": [
        {
          "name": "Title",
          "height": 12.105490848585688,
          "width": 143.0648918469218,
          "y": 2.7512479201331113,
          "x": 5.777620632279534,
          "font": "",
          "type": "label",
          "id": "cc8bd50f36e44ac3a3e5daf48d038f7c",
          "size": 18
        }, {
          "height": 187.0,
          "width": 286.0,
          "grid": {
            "intervalX": 0.0,
            "intervalY": 0.0,
            "annotationEnabled": false,
            "crs": ""
          },
          "y": 17.0,
          "x": 6.0,
          "type": "map",
          "id": "3bde6dd61cdf480eae1a67db59d74035"
        }
      ],
      "thumbnail": "geonode_thumbnail.png",
      "name": "geonode",
      "height": 210.0
    }
  ]
};

GeoNodeViewer.childContextTypes = {
  proxy: React.PropTypes.string,
  requestHeaders: React.PropTypes.object,
  muiTheme: React.PropTypes.object
};

export default GeoNodeViewer;
global.GeoNodeViewer = GeoNodeViewer;
