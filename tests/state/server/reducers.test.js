import server from '../../../src/state/server/reducers';
import {GET_SERVER_URL, SET_SERVER_URL} from '../../../src/state/actiontypes';

describe('server', () => {
  let defaultState;
  beforeEach(function() {
    defaultState = {
      url: undefined
    }
  });
  describe('GET_SERVER_URL', () => {
    it('is undefined in initial state', () => {
      let action = { type: GET_SERVER_URL};
      assert.equal(server(undefined, action), undefined);
    });
    describe('server is set', () => {
      it('returns server', () => {
        let action = { type: GET_SERVER_URL};
        assert.equal(server({url: 'sandiego.gov'}, action), 'sandiego.gov');
      });
    });
  });
  describe('SET_SERVER_URL', () => {
    it('sets the server in state', () => {
      let action = { type: SET_SERVER_URL, url: 'sandiego.gov'};
      let state = Object.assign({}, defaultState, {url: 'sandiego.gov'});
      assert.deepEqual(server(undefined, action), state);
    });
  });
});
