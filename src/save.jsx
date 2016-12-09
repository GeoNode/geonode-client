import React from 'react';
import ReactDOM from 'react-dom';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import {getCRSFToken} from './helper';
import 'whatwg-fetch';

class Save extends React.Component {
  constructor(props) {
    super(props);

    this.state = { config: {} };
     this._saveMap = this._saveMap.bind(this);
  }
  _saveToGeoNode(config) {
		var myInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCRSFToken()
      },
      body: JSON.stringify(config)
    };
    fetch(this.props.geonodeServer+'/maps/new/data',myInit).then((response) => {
    });
  }
  _saveMap(event) {
    const config = MapConfigService.save(this.props.map);
    this.setState({config: { map: { }}});
    this._saveToGeoNode(MapConfigTransformService.write(config));
  }
  render() {
    return (
      <div className="save-item">
        <button className={this.props.className} onClick={this._saveMap}>Save</button>
      </div>
    );
  }
}
Save.propTypes = {
  /**
  *    * The ol3 map instance to add to.
  *       */
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  /**
   *    * Css class name to apply on the button.
   *       */
  className: React.PropTypes.string,
  geonodeServer: React.PropTypes.string.isRequired
}

export default Save;
