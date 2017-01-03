import raf from 'raf';
raf.polyfill();

import ReactTestUtils from 'react-addons-test-utils';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {setAbout, setServer, saveMap, __RewireAPI__ as actionsRewireAPI} from '../../src/reducers/actions';
import * as types from '../../src/constants/actiontypes';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('#setAbout', () => {
    it('should create an action for SETABOUT', () => {
      const expectedAction = { type: types.SETABOUT, about: { title: 'Test'}};
      assert.deepEqual(setAbout({title: 'Test'}), expectedAction);
    });
  });
  describe('setServer', () => {
    it('should create an action for SETSERVER', () => {
      const expectedAction = { type: types.SETSERVER, server: 'server'};
      assert.deepEqual(setServer('server'), expectedAction);
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
      let state = { server: 'http://geonode.org', mapConfig: {data: '' } };
      const store = mockStore(state);
      const expectedActions = [
        { type: types.SAVE_MAP_SUCCESS, body: { result: '' }}
      ];
      return store.dispatch(saveMap())
      .then(() => {
        assert.deepEqual(store.getActions(), expectedActions);
      });
    });
    it('calls SAVE_MAP_ERROR', () => {
      actionsRewireAPI.__Rewire__('saveToGeonode', function() {
        return Promise.reject();
      });
      const store = mockStore({ server: 'http://geonode.org', mapConfig: {data: '' } });
      return store.dispatch(saveMap())
      .then(() => {
        assert.deepEqual(store.getActions()[0].type, types.SAVE_MAP_ERROR);
      });
    });
  });
});
