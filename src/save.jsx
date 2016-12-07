import React from 'react';
import ReactDOM from 'react-dom';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import 'whatwg-fetch';

class Save extends React.Component {
  constructor(props) {
    super(props);

    this.state = { config: {} };
     this._saveMap = this._saveMap.bind(this);
  }
  _saveMap(event) {
    const config = MapConfigService.save(this.props.map);
    console.log(MapConfigTransformService.write(config));
    this.setState({config: { map: { }}});
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
}

export default Save;
