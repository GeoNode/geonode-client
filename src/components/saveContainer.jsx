import React from 'react';
import {injectIntl, intlShape} from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {setAbout} from '../state/mapConfig/actions';
import {saveMap} from '../state/map/actions';
import * as selectors from '../state/map/selectors';
import {connectAdvanced} from 'react-redux';

import SaveView from './saveView';

export class SaveContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorOpen: false,
      open: false,
      success: false,
      isSaving: false,
      saved: false
    };
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success && !nextProps.isSaving && !this.state.saved) {
      this.setState({saved: true, open: false, success: false});
    }
    if(nextProps.error && nextProps.msg) {
      this._setError(nextProps.msg);
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
    this.setState({open: true, isSaving: true});
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
    let editing = this.props.id ? true : false;
    return (
      <div className="save-view">
        <SaveView ref='saveview' close={this.close.bind(this)} titleError={this.state.titleError} save={this.save.bind(this)} open={this.state.open} error={this.state.error} editing={editing}/>
      </div>
    )
  }
}
function selectorFactory(dispatch) {
  let result = {};
  const saveAbout = (about) => {
    dispatch(setAbout(about));
  }
  const save = () => {
    dispatch(saveMap());
  }
  return (nextState, nextOwnProps) => {
    const newState = {
      saveAbout,
      save,
      success: selectors.success(nextState),
      isSaving: selectors.isSaving(nextState),
      error: selectors.error(nextState),
      mapId: selectors.getMapId(nextState),
      msg: selectors.errorMessage(nextState)
    };
    const nextResult = Object.assign({}, nextOwnProps, newState);
    result = nextResult;
    return result;
  }
}
SaveContainer.propTypes = {
  saveAbout: React.PropTypes.func,
  save: React.PropTypes.func,
  id: React.PropTypes.number,
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
