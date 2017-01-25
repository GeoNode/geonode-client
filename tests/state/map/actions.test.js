import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import td from 'testdouble';

import * as types from '../../../src/state/actiontypes'
import {getId, isEditing, setMapId, getOl3Map, setOl3Map, saveMap, saveMapError, saveMapSuccess, setUserLoggedIn, __RewireAPI__ as actionsRewireAPI} from '../../../src/state/map/actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('#getId', () => {
  it('should create an action for GET_MAP_ID', () => {
    const expectedAction = {type: types.GET_MAP_ID};
    assert.deepEqual(getId(), expectedAction);
  });
});
describe('#isEditing', () => {
  it('should create an action for GET_IS_EDITING', () => {
    const expectedAction = {type: types.GET_IS_EDITING};
    assert.deepEqual(isEditing(), expectedAction);
  });
});
describe('#setId', () => {
  it('should create an action for SET_MAP_ID', () => {
    const expectedAction = {type: types.SET_MAP_ID, mapId: 1};
    assert.deepEqual(setMapId(1), expectedAction);
  });
});
describe('#saveMapError', () => {
  it('should create an action for SAVE_MAP_ERROR', () => {
    const expectedAction = {type: types.SAVE_MAP_ERROR, error: 'failed'};
    assert.deepEqual(saveMapError('failed'), expectedAction);
  });
});
describe('#saveMapSuccess', () => {
  it('should create an action for SAVE_MAP_SUCCESS', () => {
    const expectedAction = {type: types.SAVE_MAP_SUCCESS, result: { result: '1'}};
    assert.deepEqual(saveMapSuccess({result: '1'}), expectedAction);
  });
});
describe('saveMap', () => {
  afterEach(() => {
    actionsRewireAPI.__ResetDependency__('saveToGeonode');
  })
  it('calls SAVE_MAP_SUCCESS', () => {
    let result = { result: ''};
    actionsRewireAPI.__Rewire__('saveToGeonode', function() {
      return Promise.resolve(result);
    });
    const store = mockStore({server: { url: 'http://geonode.org'}, map: { id: undefined}});
    const expectedActions = [
      { type: types.SAVE_MAP_SUCCESS, result: { result: '' }}
    ];
    return store.dispatch(saveMap())
    .then(() => {
      assert.deepEqual(store.getActions(), expectedActions);
    });
  });
  it('calls saveToGeonode with server url and mapconfig', () => {
    let server;
    actionsRewireAPI.__Rewire__('saveToGeonode', function(server, config, id) {
      return Promise.resolve({server, config, id});
    });
    const store = mockStore({server: { url: 'http://geonode.org'}, mapConfig: { test: true }, map: { id: undefined}});
    return store.dispatch(saveMap())
    .then((result) => {
      assert.equal(result.result.server, 'http://geonode.org');
      assert.deepEqual(result.result.config, {test: true});
    });
  });
});
describe('#setUserLoggedIn', () => {
  it('should create an action for SET_USER_LOGGED_IN', () => {
    const expectedAction = {type: types.SET_USER_LOGGED_IN, loggedIn: true};
    assert.deepEqual(setUserLoggedIn(true), expectedAction);
  });
});
