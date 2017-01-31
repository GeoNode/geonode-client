import React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {setAbout} from '../state/mapConfig/actions';
import {saveMap, setMapId, ajaxLogin} from '../state/map/actions';
import * as selectors from '../state/map/selectors';
import * as mapConfigSelectors from '../state/mapConfig/selectors';
import {connectAdvanced} from 'react-redux';
import LoginModal from 'boundless-sdk/components/LoginModal';

import SaveView from './saveView';

export class SaveContainer extends React.Component {
  constructor(props, context) {
    super(props);
    this._muiTheme = context.muiTheme || getMuiTheme();
    this.state = {
      error: false,
      errorOpen: false,
      open: false,
      success: false,
      isSaving: false,
      saved: false,
      loginOpen: false
    };
  }
  getChildContext() {
    return {muiTheme: this._muiTheme};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success && !nextProps.isSaving && !this.state.saved) {
      this.setState({saved: true, open: false, success: false});
    }
    if(nextProps.error && nextProps.msg) {
      this._setError(nextProps.msg);
    }
    if (nextProps.userLoggedIn && this.state.loginOpen) {
      this.setState({loginOpen: false, open: true, success: false});
    }
  }
  _setError(msg) {
    this.setState({
      errorOpen: true,
      error: true,
      msg: msg
    });
  }
  close() {
    this.setState({open: false});
  }
  open() {
    if(this.props.checkLogin && !this.props.userLoggedIn) {
      this.setState({loginOpen: true});
    } else {
      this.setState({open: true, isSaving: true});
    }
  }
  closeLogin() {
    this.setState({loginOpen: false});
  }
  login(username, password) {
    this.props.loginUser(username, password);
  }
  saveAsNew(mapTitle, mapAbstract) {
    this.props.resetMapId();
    this.save(mapTitle, mapAbstract);
  }
  save(mapTitle, mapAbstract) {
    if(mapTitle) {
      this.setState({isSaving: false, saved: false});
      this.props.saveAbout({title: mapTitle, abstract: mapAbstract});
      this.props.save();
    } else {
      this.setState({titleError: true})
    }
  }
  render() {
    let loginView;
    let editing = this.props.mapId ? true : false;
    if(this.props.checkLogin) {
      loginView = (<LoginModal close={this.closeLogin.bind(this)} open={this.state.loginOpen} login={this.login.bind(this)} />)
    }
    return (
      <div className="save-view">
        <SaveView ref='saveview' close={this.close.bind(this)} titleError={this.state.titleError} save={this.save.bind(this)} open={this.state.open} error={this.state.error} editing={editing} maptitle={this.props.mapTitle} mapabstract={this.props.mapAbstract} saveAsNew={this.saveAsNew.bind(this)}/>
        {loginView}
      </div>
    )
  }
}
function selectorFactory(dispatch) {
  let result = {};
  const resetMapId = () => {
    dispatch(setMapId(undefined));
  }
  const saveAbout = (about) => {
    dispatch(setAbout(about));
  }
  const save = () => {
    dispatch(saveMap());
  }
  const loginUser = (username, password) => {
    dispatch(ajaxLogin(username, password));
  }
  return (nextState, nextOwnProps) => {
    const newProps = {
      saveAbout,
      save,
      resetMapId,
      success: selectors.success(nextState),
      isSaving: selectors.isSaving(nextState),
      error: selectors.error(nextState),
      mapId: selectors.getMapId(nextState),
      mapTitle: mapConfigSelectors.getMapTitle(nextState),
      mapAbstract: mapConfigSelectors.getMapAbstract(nextState),
      msg: selectors.errorMessage(nextState),
      loginUser,
      userLoggedIn: selectors.isUserLoggedIn(nextState),
      checkLogin: selectors.checkLogin(nextState)
    };
    const nextResult = Object.assign({}, nextOwnProps, newProps);
    result = nextResult;
    return result;
  }
}
SaveContainer.propTypes = {
  saveAbout: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  mapId: React.PropTypes.number,
  intl: intlShape.isRequired
}
SaveContainer.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
SaveContainer.contextTypes = {
  muiTheme: React.PropTypes.object
};

export const SaveContainerIntl = injectIntl(SaveContainer, {withRef: true});
export default connectAdvanced(selectorFactory, {withRef: true})(SaveContainerIntl);
