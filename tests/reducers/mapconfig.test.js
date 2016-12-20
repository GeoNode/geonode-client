import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import ReactTestUtils from 'react-addons-test-utils';

import mapConfig from '../../src/reducers/mapConfig';
import {SETMAP, SETABOUT} from '../../src//constants/actiontypes';

describe('mapConfig', () => {
  let config;
  beforeEach(function() {
    config = {
      defaultSourceType: '',
      about: {},
      map: {},
      sources: {}
    }
  });
	it('has initial state', () => {
    assert.deepEqual(mapConfig(undefined, {}), config);
	});
  describe('setAbout', () => {
    it('sets the state for about in the defaultState', () => {
      let about = { title: 'T', abstract: 't' };
      config.about = about;
      let action = { type: SETABOUT, about: about };
      assert.deepEqual(mapConfig(undefined, action), config);
    });
    it('sets the state for about', () => {
      let about = { title: 'T', abstract: 't' };
      let action = { type: SETABOUT, about: about };
      assert.deepEqual(mapConfig({}, action), {about: about});
    });
  });
  describe('setMap', () => {
    it('sets the state for about', () => {
      let newConf = { sources: { 1: 'Test' }, map: { 1: 'Test'} };
      let action = { type: 'SETMAP', config: newConf};
      assert.deepEqual(mapConfig({}, action), newConf);
    });
    it('sets the state for about in the defaultState', () => {
      let newConf = { sources: { 1: 'Test' }, map: { 1: 'Test'} };
      let action = { type: 'SETMAP', config: newConf};
      config.map = newConf.map;
      config.sources = newConf.sources;
      assert.deepEqual(mapConfig(undefined, action), config);
    });
  });
});
