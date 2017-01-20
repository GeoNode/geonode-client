import React from 'react';
import ol from 'openlayers';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme || getMuiTheme()
    };
  }
  _openSaveModal() {
    this.props.save(getMapConfigFromMap(this.props.map));
    this.refs.savemapmodal.getWrappedInstance().refs.wrappedInstance.open();
  }
  getStyles() {
    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;
    return {
      root: Object.assign(this.props.style || {}, {
        background: rawTheme.palette.primary1Color
      })
    };
  }
  render() {
    const {formatMessage} = this.props.intl;
    const tooltip = formatMessage(messages.savetext);
    const icon = <SaveIcon/>;
    let styles = this.getStyles();
    return (
      <div className="save-item">
        <Button tooltipPosition={this.props.tooltipPosition} buttonType='Action' mini={true} secondary={true} className={classNames('geonode-save', this.props.className)} style={styles.root} tooltip={tooltip} onTouchTap={this._openSaveModal.bind(this)}>{icon}</Button>
        <SaveContainer ref='savemapmodal' />
      </div>
    );
  }
}
Save.contextTypes = {
  muiTheme: React.PropTypes.object
};
Save.propTypes = {
  save: React.PropTypes.func,
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  className: React.PropTypes.string,
  tooltipPosition: React.PropTypes.oneOf(['bottom', 'bottom-right', 'bottom-left', 'right', 'left', 'top-right', 'top', 'top-left']),
  style: React.PropTypes.object,
  intl: intlShape.isRequired
}
function selectorFactory(dispatch) {
  let ownProps = {};
  let result = {};
  const save= (config) => {
    dispatch(setMapConfig(config));
  }
  return (nextState, nextOwnProps) => {
    const nextResult = Object.assign({}, nextOwnProps, {save});
    ownProps = nextOwnProps;
    result = nextResult;
    return result;
  }
}
export const SaveIntl = injectIntl(Save, {withRef: true});
export default connectAdvanced(selectorFactory, {withRef: true})(SaveIntl);
