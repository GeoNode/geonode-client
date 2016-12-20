import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'boundless-sdk/components/Button';
import {setAbout, saveMap, resetMap} from '../reducers/actions';
import {connectAdvanced} from 'react-redux';

const messages = defineMessages({
  title: {
    id: 'savedetailmodal.title',
    description: 'Modal Title',
    defaultMessage: 'Save the Map'
  },
  savemapbutton: {
    id: 'savedetailmodal.savemapbutton',
    description: 'Text for Save Button',
    defaultMessage: 'Save'
  },
  closebutton: {
    id: 'savedetailmodal.closebutton',
    description: 'Text for Close Button',
    defaultMessage: 'Close'
  },
  mapabstract: {
    id: 'savedetailmodal.mapabstract',
    description: 'Text for Abstract Label',
    defaultMessage: 'Abstract'
  },
  maptitle: {
    id: 'savedetailmodal.maptitle',
    description: 'Text for Title Label',
    defaultMessage: 'Title'
  },
  errormsg: {
    id: 'savedetailmodal.errormsg',
    description: 'Text for Save Error message',
    defaultMessage: 'Error. {msg}'
  },
  successmsg: {
    id: 'savedetailmodal.successmsg',
    description: 'Text for Save Map Success Message',
    defaultMessage: 'Map saved successfully'
  },
  titleerrormsg: {
    id: 'savedetailmodal.titleerrormsg',
    description: 'Text for Error message, if a title is missing',
    defaultMessage: 'Please add a title'
  }
});

export class SaveDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorOpen: false,
      open: false,
      maptititle: '',
      mapabstract: '',
      success: false,
      isSaving: false
    };
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success && !nextProps.isSaving) {
      this.setState({open: false, success: false, isSaving: false});
      this.props.reset();
    }
    if(nextProps.error === true) {
      this._setError(nextProps.msg);
    }
  }
  open() {
    this.setState({open: true});
  }
  _setError(msg) {
    this.setState({
      errorOpen: true,
      error: true,
      msg: msg
    });
  }
  _handleRequestClose() {
    this.setState({
      errorOpen: false
    });
  }
  _handleSuccessClose() {
    this.setState({
      errorOpen: false,
      open: false
    });
  }
  saveMap() {
    const {formatMessage} = this.props.intl;
    const mapTitle = this.refs.maptitle.getValue();
    if(mapTitle) {
      this.setState({isSaving: true});
      this.props.onClick({title: mapTitle, abstract: this.refs.mapabstract.getValue()});
    } else {
      this._setError(formatMessage(messages.titleerrormsg));
    }
  }
  close() {
    this.setState({open: false});
  }
  render() {
    const {formatMessage} = this.props.intl;
    const actions = [
      <Button buttonType='Flat' primary={true} label={formatMessage(messages.savemapbutton)} onTouchTap={this.saveMap.bind(this)} />,
      <Button buttonType='Flat' label={formatMessage(messages.closebutton)} onTouchTap={this.close.bind(this)} />
    ];
    let success, error;
    if(this.state.success === true) {
      success = (<Snackbar
        autoHideDuration={5000}
        style={{transitionProperty : 'none'}}
        bodyStyle={{lineHeight: '24px', height: 'auto'}}
        open={this.state.success}
        message={formatMessage(messages.successmsg, {})}
        onRequestClose={this._handleRequestClose.bind(this)}
      />);
    }
    if(this.state.error === true) {
      error = (<Snackbar
        autoHideDuration={5000}
        style={{transitionProperty : 'none'}}
        bodyStyle={{lineHeight: '24px', height: 'auto'}}
        open={this.state.errorOpen}
        message={formatMessage(messages.errormsg, {msg: this.state.msg})}
        onRequestClose={this._handleRequestClose.bind(this)}
      />);
    }
    return (
      <Dialog className='save-map-modal'  actions={actions} autoScrollBodyContent={true} modal={true} title={formatMessage(messages.title)} open={this.state.open} onRequestClose={this.close.bind(this)}>
        <TextField ref='maptitle' floatingLabelText={formatMessage(messages.maptitle)} /><br/>
        <TextField ref='mapabstract' floatingLabelText={formatMessage(messages.mapabstract)} />
				{error}
				{success}
      </Dialog>
    );
  }
}
SaveDetailModal.propTypes = {
  onClick: React.PropTypes.func,
  reset: React.PropTypes.func,
  intl: intlShape.isRequired
}
SaveDetailModal.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
SaveDetailModal.contextTypes = {
  muiTheme: React.PropTypes.object
};

function selectorFactory(dispatch) {
  let result = {};
  const onClick = (about) => {
    dispatch(setAbout(about));
    dispatch(saveMap());
  }
  const reset = () => {
    dispatch(resetMap());
  }
  return (nextState, nextOwnProps) => {
    let success, isSaving, error, msg;
    if(nextState.saveMap.success === true) {
      success = true;
      isSaving = false;
    }
    if(nextState.saveMap.error && nextState.saveMap.success === false) {
      error = true;
      msg = nextState.saveMap.error.message;
    }
    const nextResult = Object.assign({}, nextOwnProps, {reset, onClick, success, isSaving, error, msg});
    result = nextResult;
    return result;
  }
}
export const SaveDetailModalIntl = injectIntl(SaveDetailModal, {withRef: true});
export default connectAdvanced(selectorFactory, {withRef: true})(SaveDetailModalIntl);
