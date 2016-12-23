import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import ReactTestUtils from 'react-addons-test-utils';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../../src/reducers/actions';
import * as types from '../../src/constants/actiontypes';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('setAbout', () => {
    it('should create an action for SETABOUT', () => {
      const expectedAction = { type: types.SETABOUT, about: { title: 'Test'}};
      assert.deepEqual(actions.setAbout({title: 'Test'}), expectedAction);
    });
  });
  describe('setServer', () => {
    it('should create an action for SETSERVER', () => {
      const expectedAction = { type: types.SETSERVER, server: 'server'};
      assert.deepEqual(actions.setServer('server'), expectedAction);
    });
  });
  describe('saveMap', () => {
    afterEach(() => {
      fetchMock.restore();
    })
    it('calls SAVE_MAP_SUCCESS', () => {
      fetchMock
      .mock('http://geonode.org/maps/new/data', {result: ''});
      const store = mockStore({ server: 'http://geonode.org', mapConfig: {data: '' } });
      const expectedActions = [
        { type: types.SAVE_MAP_SUCCESS, body: { result: '' }}
      ];
      return store.dispatch(actions.saveMap())
      .then(() => {
        assert.deepEqual(store.getActions(), expectedActions);
      });
    });
    it('calls SAVE_MAP_ERROR', () => {
      fetchMock
      .mock('http://geonode.org/maps/new/data', 403);
      const store = mockStore({ server: 'http://geonode.org', mapConfig: {data: '' } });
      return store.dispatch(actions.saveMap())
      .then(() => {
        assert.deepEqual(store.getActions()[0].type, types.SAVE_MAP_ERROR);
      });
    });
    describe('server with trailing slash', () => {
      it('calls SAVE_MAP_SUCCESS', () => {
        fetchMock
        .mock('http://geonode.org/maps/new/data', {result: ''});
        const store = mockStore({ server: 'http://geonode.org/', mapConfig: {data: '' } });
        const expectedActions = [
          { type: types.SAVE_MAP_SUCCESS, body: { result: '' }}
        ];
        return store.dispatch(actions.saveMap())
        .then(() => {
          assert.deepEqual(store.getActions(), expectedActions);
        });
      });
    });
  })
});
