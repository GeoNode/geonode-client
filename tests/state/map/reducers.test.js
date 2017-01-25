import map from '../../../src/state/map/reducers';
import {GET_MAP_ID, SET_MAP_ID, GET_IS_EDITING, GET_OL3_MAP, SET_OL3_MAP, SAVE_MAP_SUCCESS, SAVE_MAP_ERROR, SET_USER_LOGGED_IN} from '../../../src/state/actiontypes';
describe('map', () => {
  let defaultState;
  beforeEach(function() {
    defaultState = {
      id: undefined,
      userLoggedIn: false,
      save: {
        success: false,
        error: false,
        errorMessage: undefined
      }
    }
  });
	it('has initial state', () => {
    assert.deepEqual(map(undefined, {}), defaultState);
	});
  describe('GET_MAP_ID', () => {
    it('is undefined in initial state', () => {
      let action = { type: GET_MAP_ID};
      assert.equal(map(undefined, action), undefined);
    });
    describe('map id is set', () => {
      it('returns map id', () => {
        let action = { type: GET_MAP_ID};
        assert.equal(map({id: 1}, action), 1);
      });
    });
  });
  describe('SET_MAP_ID', () => {
    it('sets the map ID in state', () => {
      let action = { type: SET_MAP_ID, mapId: 1};
      let state = Object.assign({}, defaultState, { id: 1});
      assert.deepEqual(map(undefined, action), state);
    });
  });
  describe('GET_IS_EDITING', () => {
    it('is undefined in initial state', () => {
      let action = { type: GET_IS_EDITING};
      assert.equal(map(undefined, action), false);
    });
    describe('map id is set', () => {
      it('returns map id', () => {
        let action = { type: GET_IS_EDITING};
        assert.equal(map({id: 1}, action), true);
      });
    });
  });
  describe('SAVE_MAP_SUCCESS', () => {
    it('sets the new map id in state', () => {
      let action = { type: SAVE_MAP_SUCCESS, result: {id: 1}};
      let state = Object.assign({}, defaultState, { id: 1, save: { success: true, error: false}});
      assert.deepEqual(map(undefined, action), state);
    });
  });
  describe('SAVE_MAP_ERROR', () => {
    it('sets the errorMessage and error', () => {
      let action = { type: SAVE_MAP_ERROR, error: {text: 'Failure'}};
      let state = Object.assign({}, defaultState, { save: { success: false, error: true, errorMessage: { text: 'Failure'}}});
      assert.deepEqual(map(undefined, action), state);
    });
  });
  describe('SET_USER_LOGGED_IN', () => {
    it('sets if the user is logged in', () => {
      let action = {type: SET_USER_LOGGED_IN, loggedIn: true};
      let state = Object.assign({}, defaultState, { userLoggedIn: true});
      assert.deepEqual(map(undefined, action), state);
    });
  });
});
