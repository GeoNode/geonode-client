import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Button from 'boundless-sdk/components/Button';

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
  savenewmapbutton: {
    id: 'savedetailmodal.savenewmapbutton',
    description: 'Text for Save Button',
    defaultMessage: 'Save as New'
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

export class SaveView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      maptititle: '',
      mapabstract: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.titleError) {
      this._setTitleError();
    }
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  _setTitleError() {
    const {formatMessage} = this.props.intl;
    this._setError(formatMessage(messages.titleerrormsg));
  }
  _handleClose() {
    this.setState({
      open: false
    });
  }
  _handleRequestClose() {
    this.setState({
      errorOpen: false
    });
  }
  _setError(msg) {
    this.setState({
      errorOpen: true,
      error: true,
      msg: msg
    });
  }
  _handleSave() {
    this.props.save(this.refs.maptitle.getValue(), this.refs.mapabstract.getValue());
  }
  _handleClose() {
    this.props.close();
  }
  render() {
    const {formatMessage} = this.props.intl;
    const actions = [
      <FlatButton className='save-btn' primary={true} label={formatMessage(messages.savemapbutton)} onTouchTap={this._handleSave.bind(this)} />,
      <FlatButton className='close-btn' label={formatMessage(messages.closebutton)} onTouchTap={this._handleClose.bind(this)} />
    ];
    if(this.props.editing) {
      actions.unshift(<FlatButton className='save-btn' label={formatMessage(messages.savenewmapbutton)} onTouchTap={this._handleNewSave.bind(this)} />)
    }
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
      <div className='save-modal'>
        <Dialog className='save-map-modal'  actions={actions} autoScrollBodyContent={true} modal={true} title={formatMessage(messages.title)} open={this.props.open} onRequestClose={this._handleClose.bind(this)}>
          <TextField ref='maptitle' floatingLabelText={formatMessage(messages.maptitle)}/><br/>
          <TextField ref='mapabstract' floatingLabelText={formatMessage(messages.mapabstract)} />
          {error}
          {success}
        </Dialog>
      </div>
    );
  }
}
SaveView.propTypes = {
  save: React.PropTypes.func,
  close: React.PropTypes.func,
  open: React.PropTypes.bool,
  titleError: React.PropTypes.bool,
  intl: intlShape.isRequired
}
SaveView.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
SaveView.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default injectIntl(SaveView, {withRef: true});
