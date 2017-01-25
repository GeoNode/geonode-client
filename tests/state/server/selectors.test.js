import {getServerUrl} from '../../../src/state/server/selectors';

describe('serverSelectors', () => {
  describe('#getServerUrl', () => {
    it('returns the url', () => {
      assert.equal(getServerUrl({server: { url: 'http://geonode.org'}}), 'http://geonode.org');
    });
  });
});
