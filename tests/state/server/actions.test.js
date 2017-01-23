
import * as types from '../../../src/state/actiontypes'
import {getServerUrl, setServerUrl} from '../../../src/state/server/actions';

describe('#getServerUrl', () => {
  it('should create an action for GET_SERVER_URL', () => {
    const expectedAction = {type: types.GET_SERVER_URL};
    assert.deepEqual(getServerUrl(), expectedAction);
  });
});
describe('#setServerUrl', () => {
  it('should create an action for SET_SERVER_URL', () => {
    const expectedAction = {type: types.SET_SERVER_URL, url: 'sandiego.gov'};
    assert.deepEqual(setServerUrl('sandiego.gov'), expectedAction);
  });
});
