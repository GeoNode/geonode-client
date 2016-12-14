import React from 'react';
import ReactDOM from 'react-dom';
import enMessages from 'boundless-sdk/locale/en.js';
import {IntlProvider} from 'react-intl';
import {setMapConfig, saveMap} from '../reducers/actions'
import { connect } from 'react-redux'

export class Save extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {onClick, map} = this.props;
    return (
      <div className="save-item">
        <button className={this.props.className} onClick={e => {
                 e.preventDefault()
                 onClick()
               }}>Save</button>
      </div>
    );
  }
}
Save.propTypes = {
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  /**
   *    * Css class name to apply on the button.
   *       */
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setMapConfig(ownProps.map))
      dispatch(saveMap())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Save);
