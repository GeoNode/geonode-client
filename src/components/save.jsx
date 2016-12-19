import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Button from 'boundless-sdk/components/Button';
import classNames from 'classnames';
import enMessages from 'boundless-sdk/locale/en.js';
import SaveIcon from 'material-ui/svg-icons/content/save';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import SaveDetailModal from './savedetailmodal';
import {setMapConfig, saveMap} from '../reducers/actions'
import { connectAdvanced } from 'react-redux'

const messages = defineMessages({
  savetext: {
    id: 'savemap.savetext',
    description: 'Text for Save Button',
    defaultMessage: 'Save'
  }
});
export class Save extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      muiTheme: context.muiTheme || getMuiTheme()
    }
  }
  _openSaveModal() {
    this.props.onClick();
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
    let {map} = this.props;
    const tooltip = formatMessage(messages.savetext);
    const icon = <SaveIcon/>;
    let styles = this.getStyles();
    return (
      <div className="save-item">
        <Button tooltipPosition={this.props.tooltipPosition} buttonType='Action' mini={true} secondary={true} className={classNames('sdk-component save', this.props.className)} style={styles.root} tooltip={tooltip} onTouchTap={this._openSaveModal.bind(this)}>{icon}</Button>
        <SaveDetailModal ref='savemapmodal' />
      </div>
    );
  }
}
Save.contextTypes = {
	muiTheme: React.PropTypes.object
};
Save.propTypes = {
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  /**
   *    * Css class name to apply on the button.
   *       */
  className: React.PropTypes.string,
  tooltipPosition: React.PropTypes.oneOf(['bottom', 'bottom-right', 'bottom-left', 'right', 'left', 'top-right', 'top', 'top-left']),
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
