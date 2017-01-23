import olMap from '../../../src/state/ol/reducers';
import {GET_OL_MAP, SET_OL_MAP} from '../../../src/state/actiontypes';
describe('ol', () => {
  let defaultState;
  beforeEach(function() {
    defaultState = {
      olMap: undefined
    }
  });
  describe('GET_OL_MAP', () => {
    it('is undefined in initial state', () => {
      let action = { type: GET_OL_MAP};
      assert.equal(olMap(undefined, action), undefined);
    });
    describe('ol map is set', () => {
      it('returns map', () => {
        let action = { type: GET_OL_MAP};
        assert.deepEqual(olMap({olMap: {map: true}}, action), {map: true});
      });
    });
  });
  describe('SET_OL_MAP', () => {
    it('sets the ol map in state', () => {
      let action = { type: SET_OL_MAP, map: {map: true}};
      let state = Object.assign({}, defaultState, { olMap: {map: true}});
      assert.deepEqual(olMap(undefined, action), state);
    });
  });
});
