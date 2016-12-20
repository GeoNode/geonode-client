import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import ReactTestUtils from 'react-addons-test-utils';

import server from '../../src/reducers/server';

describe('server', () => {
	it('has initial state', () => {
    assert.equal(server(undefined, {}), 'http://localhost');
	});
  describe('setServer', () => {
    it('sets the server as state', () => {
      let action = { type: 'SETSERVER', server: 'http://test'};
      assert.equal(server('http://localhost', action), 'http://test');
    });
  });
});
