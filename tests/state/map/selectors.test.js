import {isSaving, success, error, errorMessage, getMapId, getMapViewUrl, isUserLoggedIn, checkLogin} from '../../../src/state/map/selectors';

describe('mapSelectors', () => {
  describe('#isSaving', () => {
    it('returns false if it was successfull', () => {
      assert.equal(isSaving({map: { save: { success: true}}}), false);
    });
    it('returns true if it was not successfull', () => {
      assert.equal(isSaving({ map: {save: {}}}), true);
    });
  });
  describe('#success', () => {
    it('returns true if it was successfull', () => {
      assert.equal(success({map: {save: { success: true}}}), true);
    });
  });
  describe('#error', () => {
    let state;
    beforeEach(() => {
      state = {map: {save: { success: undefined, error: undefined}}};
    });
    describe('success is false', () => {
      beforeEach(() => {
        state.map.save.success = false;
      });
      it('returns false', () => {
        assert.equal(error(state), false);
      });
      describe('error is set', () => {
        beforeEach(() => {
          state.map.save.error = {};
        });
        it('returns true', () => {
          assert.equal(error(state), true);
        });
      });
    });
    describe('success is true', () => {
      beforeEach(() => {
        state.map.save.success = true;
      });
      it('returns false', () => {
        assert.equal(error(state), false);
      });
    });
  });
  describe('#errorMessage', () => {
    let state;
    beforeEach(() => {
      state = {map: {save: { success: undefined, error: undefined}}};
    });
    describe('success is false', () => {
      beforeEach(() => {
        state.map.save.success = false;
      });
      it('returns false', () => {
        assert.equal(errorMessage(state), undefined);
      });
      describe('error is set', () => {
        beforeEach(() => {
          state.map.save = { error: true, errorMessage: 'Test'};
        });
        it('returns error message', () => {
          assert.equal(errorMessage(state), 'Test');
        });
      });
    });
    describe('success is true', () => {
      beforeEach(() => {
        state.map.save.success = true;
      });
      it('returns false', () => {
        assert.equal(errorMessage(state), undefined);
      });
    });
  });
  describe('#isUserLoggedIn', () => {
    it('returns false if a user is not loggedIn', () => {
      assert.equal(isUserLoggedIn({map: { userLoggedIn: false}}), false);
    });
    it('returns true if it was not successfull', () => {
      assert.equal(isUserLoggedIn({map: { userLoggedIn: true}}), true);
    });
  });
  describe('#checkLogin', () => {
    it('returns false by default', () => {
      assert.equal(checkLogin({map: { checkLogin: false}}), false);
    });
    it('returns true if it was set', () => {
      assert.equal(checkLogin({map: { checkLogin: true}}), true);
    });
  });
  describe('#getMapViewUrl', () => {
    it('returns the url', () => {
      assert.equal(getMapViewUrl({map: {id: 1},server: {url: 'http://geonode.org'}}), 'http://geonode.org/maps/1');
    });
  });
});
