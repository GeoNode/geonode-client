import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import {getCRSFToken, hasTrailingSlash, removeTrailingSlash} from '../src/helper';

describe('getCRSFToken', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
	it('returns csrftoken from cookie', () => {
		assert.equal(getCRSFToken(),'1');
	});
});

describe('hasTrailingSlash', () => {
	it('returns true if a trailing slash is detected', () => {
		assert.equal(hasTrailingSlash('test/'),true);
	});
	it('returns false if no trailing slash is detected', () => {
		assert.equal(hasTrailingSlash('test'),false);
	});
});

describe('removeTrailingSLash', () => {
	it('returns str without trailing slash', () => {
		assert.equal(removeTrailingSlash('test/'),'test');
	});
	it('returns str without trailing slash', () => {
		assert.equal(removeTrailingSlash('test'),'test');
	});
});
