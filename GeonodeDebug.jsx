import React from 'react';
import ReactDOM from 'react-dom';
import GeoNodeViewer from './geonode.jsx';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import 'whatwg-fetch';

class GeoNodeViewerDebug extends React.Component {
  constructor(props) {
    super(props);
    this.state = { config: this.props.config };
    this.config = JSON.stringify(this.props.config);
    this.configUrl = '';
  }
  fetchConfigFromUrl(url) {
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.setState( { config: json});
    });
  }
  configUrlChange(config) {
    this.configUrl = config;
    this.fetchConfigFromUrl('https://cors-anywhere.herokuapp.com/'+this.configUrl);
  }
  render() {
    return (
      <div>
        <div id="debug">
          <label for="debug">Debug URL</label>
            <input
            type="text"
            value={this.configUrl}
            onChange={(event) => { this.configUrlChange(event.target.value)}}
          />
        </div>
        <GeoNodeViewer config={this.state.config} />
      </div>
    )
  }
}
GeoNodeViewer.props = {
  config: React.PropTypes.object.isRequired
};
export default GeoNodeViewerDebug;
