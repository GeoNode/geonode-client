
import * as types from '../../../src/state/actiontypes'
import {getOl3Map, setOl3Map} from '../../../src/state/ol3/actions';

describe('#getOl3Map', () => {
  it('should create an action for GET_OL3_MAP', () => {
    const expectedAction = {type: types.GET_OL3_MAP};
    assert.deepEqual(getOl3Map(), expectedAction);
  });
});
describe('#setOl3Map', () => {
  it('should create an action for SET_OL3_MAP', () => {
    const expectedAction = {type: types.SET_OL3_MAP, map: { map: true}};
    assert.deepEqual(setOl3Map({map: true}), expectedAction);
  });
});
