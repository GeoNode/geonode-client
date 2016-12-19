import React from 'react';
import ReactDOM from 'react-dom';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {setAbout, saveMap, resetMap} from '../reducers/actions';
import { connectAdvanced } from 'react-redux';

const messages = defineMessages({
  title: {
    id: 'savemap.title',
    description: 'Text for Save Button',
    defaultMessage: 'Save the Map'
  },
  savemapbutton: {
    id: 'savemap.savebutton',
    description: 'Text for Save Button',
    defaultMessage: 'Save'
  },
  closebutton: {
    id: 'savemap.closebutton',
    description: 'Title for new server name text field',
    defaultMessage: 'Close'
  },
  mapabstract: {
    id: 'savemap.mapabstract',
    description: 'Title for new server name text field',
    defaultMessage: 'Abstract'
  },
  maptitle: {
    id: 'savemap.maptitle',
    description: 'Title for new server url text field',
    defaultMessage: 'Title'
  },
  errormsg: {
    id: 'savemap.errormsg',
    description: 'Title for new server url text field',
    defaultMessage: 'Error. {msg}'
  },
  successmsg: {
    id: 'savemap.successmsg',
    description: 'Title for new server url text field',
    defaultMessage: 'Map saved successfully'
  },
  titleerrormsg: {
    id: 'savemap.titleerrormsg',
    description: 'Title for new server url text field',
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
    this.setState( {
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
    if(this.refs.maptitle.getValue()) {
      this.setState({isSaving: true});
      this.props.onClick({ title: this.refs.maptitle.getValue(), abstract: this.refs.mapabstract.getValue()});
    }else {
      this._setError(formatMessage(messages.titleerrormsg));
    }
  }
  close() {
    this.setState({open: false});
  }
  render() {
    const {formatMessage} = this.props.intl;
    const actions = [
      <FlatButton disableTouchRipple={true} primary={true} label={formatMessage(messages.savemapbutton)} onTouchTap={this.saveMap.bind(this)} />,
      <FlatButton disableTouchRipple={true} label={formatMessage(messages.closebutton)} onTouchTap={this.close.bind(this)} />
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
}
SaveDetailModal.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
SaveDetailModal.contextTypes = {
  muiTheme: React.PropTypes.object
};

function selectorFactory(dispatch) {
  let state = {};
  let ownProps = {};
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
    const nextResult = Object.assign({}, nextOwnProps, { reset, onClick, success, isSaving, error, msg });
    state = nextState;
    ownProps = nextOwnProps;
    result = nextResult;
    return result;
  }
}
export const SaveDetailModalIntl = injectIntl(SaveDetailModal, { withRef: true});
export default connectAdvanced(selectorFactory, { withRef: true})(SaveDetailModalIntl);
