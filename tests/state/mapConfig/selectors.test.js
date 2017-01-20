import {getMapTitle, getMapAbstract} from '../../../src/state/mapConfig/selectors'

describe('mapConfigSelectors', () => {
  describe('#getMapTitle', () => {
    it('returns the title', () => {
      assert.equal(getMapTitle({mapConfig: { about: { title: 'San Diego'}}}), 'San Diego');
    });
    it('returns empy string if not set', () => {
      assert.equal(getMapTitle({mapConfig: { about: { }}}), undefined);
    });
  });
  describe('#getMapAbstract', () => {
    it('returns the title', () => {
      assert.equal(getMapAbstract({mapConfig: { about: { abstract: 'San Diego is beautiful'}}}), 'San Diego is beautiful');
    });
    it('returns empy string if not set', () => {
      assert.equal(getMapAbstract({mapConfig: { about: { }}}), undefined);
    });
  });
});
