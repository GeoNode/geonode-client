import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

const messages = defineMessages({
  title: {
    id: 'loginview.title',
    description: 'Modal Title',
    defaultMessage: 'Login'
  },
  loginbutton: {
    id: 'saveview.loginbutton',
    description: 'Text for Login Button',
    defaultMessage: 'Login'
  },
  closebutton: {
    id: 'saveview.closebutton',
    description: 'Text for Close Button',
    defaultMessage: 'Close'
  },
  username: {
    id: 'saveview.username',
    description: 'Text for username label',
    defaultMessage: 'Username'
  },
  password: {
    id: 'saveview.password',
    description: 'Text for Password Label',
    defaultMessage: 'Password'
  },
  errormsg: {
    id: 'saveview.errormsg',
    description: 'Text for Save Error message',
    defaultMessage: 'Error. {msg}'
  },
});

export class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      username: '',
      password: ''
    };
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  _handleClose() {
    this.setState({
      open: false
    });
    this.props.close();
  }
  _setError(msg) {
    this.setState({
      errorOpen: true,
      error: true,
      msg: msg
    });
  }
  _handleLogin() {
    this.props.login(this.refs.username.getValue(), this.refs.password.getValue());
  }
  render() {
    const {formatMessage} = this.props.intl;
    const actions = [
      <FlatButton className='login-btn' primary={true} label={formatMessage(messages.loginbutton)} onTouchTap={this._handleLogin.bind(this)} />,
      <FlatButton className='close-btn' label={formatMessage(messages.closebutton)} onTouchTap={this._handleClose.bind(this)} />
    ];
    let error;
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
      <Dialog className='login-modal' actions={actions} autoScrollBodyContent={true} modal={true} title={formatMessage(messages.title)} open={this.props.open} onRequestClose={this._handleClose.bind(this)}>
          <TextField defaultValue={this.props.username} ref='username' floatingLabelText={formatMessage(messages.username)}/><br/>
          <TextField defaultValue={this.props.password} ref='password' floatingLabelText={formatMessage(messages.password)} type="password" />
          {error}
      </Dialog>
    );
  }
}
LoginView.propTypes = {
  login: React.PropTypes.func.isRequired,
  close: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool,
  intl: intlShape.isRequired
}
LoginView.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
LoginView.contextTypes = {
  muiTheme: React.PropTypes.object
};

export default injectIntl(LoginView, {withRef: true});
