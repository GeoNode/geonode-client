import React from 'react';
import ReactDOM from 'react-dom';
import enMessages from 'boundless-sdk/locale/en.js';
import {injectIntl} from 'react-intl';
import SaveDetailModal from './savedetailmodal';
import {setMapConfig, saveMap} from '../reducers/actions'
import { connectAdvanced } from 'react-redux'

export class Save extends React.Component {
  constructor(props) {
    super(props);
  }
  _openSaveModal() {
    this.props.onClick();
    this.refs.savemapmodal.getWrappedInstance().refs.wrappedInstance.open();
  }
  render() {
    let {map} = this.props;
    return (
      <div className="save-item">
        <button className={this.props.className} onTouchTap={this._openSaveModal.bind(this)}>Save</button>
        <SaveDetailModal ref='savemapmodal' />
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
}
function selectorFactory(dispatch) {
  let state = {};
  let ownProps = {};
  let result = {};
  const onClick = () => {
    dispatch(setMapConfig(ownProps.map));
  }
  return (nextState, nextOwnProps) => {
    const nextResult = Object.assign({}, nextOwnProps, { onClick });
    state = nextState;
    ownProps = nextOwnProps;
    result = nextResult;
    return result;
  }
}
export const SaveIntl = injectIntl(Save, { withRef: true});
export default connectAdvanced(selectorFactory, { withRef: true})(SaveIntl);
