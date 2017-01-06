import ol3Map from '../../../src/state/ol3/reducers';
import {GET_OL3_MAP, SET_OL3_MAP} from '../../../src/state/actiontypes';
describe('ol3', () => {
  let defaultState;
  beforeEach(function() {
    defaultState = {
      ol3Map: undefined
    }
  });
  describe('GET_OL3_MAP', () => {
    it('is undefined in initial state', () => {
      let action = { type: GET_OL3_MAP};
      assert.equal(ol3Map(undefined, action), undefined);
    });
    describe('ol3 map is set', () => {
      it('returns map', () => {
        let action = { type: GET_OL3_MAP};
        assert.deepEqual(ol3Map({ol3map: {map: true}}, action), {map: true});
      });
    });
  });
  describe('SET_OL3_MAP', () => {
    it('sets the ol3 map in state', () => {
      let action = { type: SET_OL3_MAP, map: {map: true}};
      let state = Object.assign({}, defaultState, { ol3Map: {map: true}});
      assert.deepEqual(ol3Map(undefined, action), state);
    });
  });
});
