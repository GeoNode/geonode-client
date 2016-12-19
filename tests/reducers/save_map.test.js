import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import ReactTestUtils from 'react-addons-test-utils';

import saveMap from '../../src/reducers/save_map';

describe('saveMap', () => {
  let defaultState;
  beforeEach(function() {
    defaultState = {
      body: undefined,
      success: false,
      error: false
    }
  });
	it('has initial state', () => {
    assert.deepEqual(saveMap(undefined, {}), defaultState);
	});
  describe('SAVE_MAP_SUCCESS', () => {
    it('sets the body as saveMap state', () => {
      let action = { type: 'SAVE_MAP_SUCCESS', body: 'http://test'};
      assert.deepEqual(saveMap({}, action), { success: true, body: 'http://test'});
    });
  });
  describe('SAVE_MAP_ERROR', () => {
    it('sets the body as saveMap state', () => {
      let action = { type: 'SAVE_MAP_ERROR', error: 'http://test'};
      assert.deepEqual(saveMap({}, action), { success: false, error: 'http://test'});
    });
  });
  describe('RESET_MAP', () => {
    it('sets the body as saveMap state', () => {
      let action = { type: 'RESET_MAP'};
      assert.deepEqual(saveMap({}, action), defaultState);
    });
  });
});
