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
    const qry = this.uriVars();
    if(qry.config) {
      this.fetchConfigFromUrl(this.proxyUrl(qry.config));
      this.configUrl = qry.config;
    } else {
      this.configUrl = '';
    }
  }
  proxyUrl(url) {
    return ('https://cors-anywhere.herokuapp.com/'+url);
  }
  uriVars(str) {
    let vars = {};
    str = str || window.location.href;
    var hashes = str.slice(str.indexOf('?') + 1).split('&');
    for(var i=0,len=hashes.length;i<len;i++){
      var hash = hashes[i].split('=');
      vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
  }
  fetchConfigFromUrl(url) {
    fetch(url).then((response) => {
      if(response.status == 200) {
        return response.json();
      }
    }).then((json) => {
      if(json) {
        this.setState( { config: json});
      }
    });
  }
  configUrlChange(config) {
    this.configUrl = config;
    this.fetchConfigFromUrl(this.proxyUrl(config));
    window.location.search = '?config='+config;
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
