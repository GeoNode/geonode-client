
import * as types from '../../../src/state/actiontypes'
import {getOlMap, setOlMap} from '../../../src/state/ol/actions';

describe('#getOlMap', () => {
  it('should create an action for GET_OL_MAP', () => {
    const expectedAction = {type: types.GET_OL_MAP};
    assert.deepEqual(getOlMap(), expectedAction);
  });
});
describe('#setOlMap', () => {
  it('should create an action for SET_OL_MAP', () => {
    const expectedAction = {type: types.SET_OL_MAP, map: { map: true}};
    assert.deepEqual(setOlMap({map: true}), expectedAction);
  });
});
