import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import ReactTestUtils from 'react-addons-test-utils';

import SaveDetailModal from '../../src/components/savedetailmodal';

describe('SaveDetailModal', () => {
  beforeEach(function() {
  });
	it('exists', () => {
    const saveComponent = ReactTestUtils.renderIntoDocument(<SaveDetailModal/>);
		assert.isDefined(ReactTestUtils.isCompositeComponent(saveComponent));
	});
	it('state config is empty', () => {
    const saveComponent = ReactTestUtils.renderIntoDocument(<SaveDetailModal/>);
	});
});
