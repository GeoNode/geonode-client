import React from 'react';
import ol from 'openlayers';
import Button from 'boundless-sdk/components/Button';
import classNames from 'classnames';
import SaveIcon from 'material-ui/svg-icons/content/save';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import SaveContainer from './saveContainer';
import {setMapConfig} from '../state/mapConfig/actions';
import {getMapConfigFromMap} from '../services/geonode';
import {connectAdvanced} from 'react-redux';

const messages = defineMessages({
  savetext: {
    id: 'save.savetext',
    description: 'Tooltip for Save Button',
    defaultMessage: 'Save'
  }
});
export class Save extends React.Component {
  constructor(props) {
    super(props);
  }
  _openSaveModal() {
    this.props.save(getMapConfigFromMap(this.props.map));
    this.refs.savemapmodal.getWrappedInstance().refs.wrappedInstance.open();
  }
  render() {
    const {formatMessage} = this.props.intl;
    const tooltip = formatMessage(messages.savetext);
    const icon = <SaveIcon/>;
    return (
      <div className="save-item">
        <Button tooltipPosition={this.props.tooltipPosition} buttonType='Action' mini={true} secondary={true} className={classNames('geonode-save', this.props.className)} tooltip={tooltip} onTouchTap={this._openSaveModal.bind(this)}>{icon}</Button>
        <SaveContainer ref='savemapmodal' />
      </div>
    );
  }
}
Save.propTypes = {
  save: React.PropTypes.func,
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  className: React.PropTypes.string,
  tooltipPosition: React.PropTypes.oneOf(['bottom', 'bottom-right', 'bottom-left', 'right', 'left', 'top-right', 'top', 'top-left']),
  style: React.PropTypes.object,
  intl: intlShape.isRequired
}
function selectorFactory(dispatch) {
  let result = {};
  const save = (config) => {
    dispatch(setMapConfig(config));
  }
  return (nextState, nextOwnProps) => {
    const nextResult = Object.assign({}, nextOwnProps, {save});
    result = nextResult;
    return result;
  }
}
export const SaveIntl = injectIntl(Save, {withRef: true});
export default connectAdvanced(selectorFactory, {withRef: true})(SaveIntl);
