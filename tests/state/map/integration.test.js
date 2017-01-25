
import {getId, isEditing, setMapId, getOl3Map, setOl3Map, saveMap, saveMapError, saveMapSuccess, setUserLoggedIn, __RewireAPI__ as actionsRewireAPI} from '../../../src/state/map/actions';
import map from '../../../src/state/map/reducers';
import mapConfig from '../../../src/state/mapConfig/reducers';
import {isSaving, success, error, errorMessage, getMapId, isUserLoggedIn} from '../../../src/state/map/selectors';
import {createStore, combineReducers} from 'redux';


describe('after saveMapSuccess', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({map, mapConfig}));
    store.dispatch(saveMapSuccess({id: 1}));
  })
  describe('#success', () => {
    it('returns true', () => {
      assert.equal(success(store.getState()), true);
    });
  });
  describe('#error', () => {
    it('returns true', () => {
      assert.equal(error(store.getState()), false);
    });
  });
  describe('#getMapId', () => {
    it('returns the id', () => {
      assert.equal(getMapId(store.getState()), 1);
    });
  });
});
describe('after saveMapError', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({map, mapConfig}));
    store.dispatch(saveMapError('Error'));
  })
  describe('#saveMapSuccess', () => {
    it('returns false', () => {
      assert.equal(success(store.getState()), false);
    });
  });
  describe('#error', () => {
    it('returns true', () => {
      assert.equal(error(store.getState()), true);
    });
  });
  describe('#errorMessage', () => {
    it('returns true', () => {
      assert.equal(errorMessage(store.getState()), 'Error');
    });
  });
});
describe('setMapId', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({map, mapConfig}));
    store.dispatch(setMapId(1));
  })
  describe('#getMapId', () => {
    it('returns true', () => {
      assert.equal(getMapId(store.getState()), 1);
    });
  });
});
describe('#isUserLoggedIn', () => {
  let store;
  beforeEach(() => {
    store = createStore(combineReducers({map, mapConfig}));
  });
  it('is false by default', () => {
    assert.equal(isUserLoggedIn(store.getState()), false);
  });
  describe('user is logged in', () => {
    beforeEach(() => {
      store.dispatch(setUserLoggedIn(true));
    });
    it('returns true', () => {
      assert.equal(isUserLoggedIn(store.getState()), true);
    });
  });
  });
