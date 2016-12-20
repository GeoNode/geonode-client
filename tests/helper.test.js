import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import {getCRSFToken} from '../src/helper';

describe('getCRSFToken', () => {
  let map;
  beforeEach(function() {
		document.cookie = "csrftoken=1;"
  });
	it('returns csrftoken from cookie', () => {
		assert.equal(getCRSFToken(),'1');
	});
});
