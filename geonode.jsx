import React from 'react';
global.React = React;
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;
import ol from 'openlayers';
import {addLocaleData, IntlProvider} from 'react-intl';
global.IntlProvider = IntlProvider;
import Globe from 'boundless-sdk/js/components/Globe.jsx';
import LegendIcon from 'material-ui/svg-icons/image/image';
import Legend from 'boundless-sdk/js/components/Legend.jsx';
import PanelButton from 'boundless-sdk/js/components/PanelButton.jsx';
import QGISPrint from 'boundless-sdk/js/components/QGISPrint.jsx';
import Zoom from 'boundless-sdk/js/components/Zoom.jsx';
import Rotate from 'boundless-sdk/js/components/Rotate.jsx';
import HomeButton from 'boundless-sdk/js/components/HomeButton.jsx';
import MapPanel from 'boundless-sdk/js/components/MapPanel.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LayerList from 'boundless-sdk/js/components/LayerList.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import enLocaleData from 'react-intl/locale-data/en.js';
import InfoPopup from 'boundless-sdk/js/components/InfoPopup.jsx';
import MapConfigTransformService from 'boundless-sdk/js/services/MapConfigTransformService.js';
import MapConfigService from 'boundless-sdk/js/services/MapConfigService.js';
import Navigation from 'boundless-sdk/js/components/Navigation.jsx';
import Measure from 'boundless-sdk/js/components/Measure.jsx';
import enMessages from 'boundless-sdk/locale/en.js';
global.enMessages = enMessages;

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
  view: new ol.View({
    center: [0, 0],
    zoom: 4
  })
});

class GeoNodeViewer extends React.Component {
  constructor(props) {
    super(props);
  }
  updateMap(props) {
    MapConfigService.load(MapConfigTransformService.transform(props.config, props.proxy), map);
  }
  componentWillMount() {
    this.updateMap(this.props);
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
  componentWillReceiveProps(props) {
    this.updateMap(props);
  }
  render() {
    return (
       <div id='content'>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Navigation secondary={true} toggleGroup='navigation' toolId='nav' />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <Measure toggleGroup='navigation' map={map}/>
          </ToolbarGroup>
        </Toolbar>
        <MapPanel useHistory={true} id='map' map={map} />
        <div id='globe-button'><Globe tooltipPosition='right' map={map} /></div>
        <div><PanelButton className='legenddiv' contentClassName='legendcontent' buttonClassName='legend-button' icon={<LegendIcon />} tooltipPosition='top-left' buttonTitle='Show legend' map={map} content={<Legend map={map} />}/></div>
        <div id='print-button'><QGISPrint menu={false} map={map} layouts={printLayouts} /></div>
        <div id='home-button'><HomeButton tooltipPosition='right' map={map} /></div>
        <div><LayerList allowRemove={false} tooltipPosition='top-left' allowStyling={false} map={map} /></div>
        <div id='zoom-buttons'><Zoom tooltipPosition='right' map={map} /></div>
        <div id='rotate-button'><Rotate tooltipPosition='top-left' map={map} /></div>
        <div id='popup' className='ol-popup'><InfoPopup toggleGroup='navigation' toolId='nav' infoFormat='application/vnd.ogc.gml' map={map} /></div>
      </div>
    );
  }
}

GeoNodeViewer.props = {
  config: React.PropTypes.object.isRequired,
  proxy: React.PropTypes.string
};

GeoNodeViewer.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default GeoNodeViewer;
global.GeoNodeViewer = GeoNodeViewer;
