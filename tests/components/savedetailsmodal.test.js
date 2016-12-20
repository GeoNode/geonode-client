import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';

import ReactTestUtils from 'react-addons-test-utils';

import {SaveDetailModalIntl} from '../../src/components/saveDetailModal';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {renderWithIntl} from '../testhelper'

const intlProvider = new IntlProvider({locale: 'en'}, {});
const {intl} = intlProvider.getChildContext();

describe('SaveDetailModal', () => {
  beforeEach(function() {
  });
	it('exists', () => {
    const saveComponent = renderWithIntl(<SaveDetailModalIntl />);
		assert.isDefined(ReactTestUtils.isCompositeComponent(saveComponent));
	});
	it('state config is empty', () => {
    const saveComponent = renderWithIntl(<SaveDetailModalIntl />);
	});
});
