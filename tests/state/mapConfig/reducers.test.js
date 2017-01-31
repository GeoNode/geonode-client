import mapConfig from '../../../src/state/mapConfig/reducers';
import {SET_ABOUT, SET_MAP_CONFIG} from '../../../src/state/actiontypes';
describe('mapConfig', () => {
  let defaultState;
  beforeEach(function() {
    defaultState = {
      defaultSourceType: '',
      about: {},
      map: {},
      sources: {}
    }
  });
	it('has initial state', () => {
    assert.deepEqual(mapConfig(undefined, {}), defaultState);
	});
  describe('SET_ABOUT', () => {
    it('sets the map ID in state', () => {
      let action = { type: SET_ABOUT, about: { title: 'Test', abstract: 'Test'}};
      let state = Object.assign({}, defaultState, { about : {title: 'Test', abstract: 'Test'}});
      assert.deepEqual(mapConfig(undefined, action), state);
    });
  });
});
