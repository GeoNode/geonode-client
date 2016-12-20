import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';
import ol from 'openlayers';

import ReactTestUtils from 'react-addons-test-utils';

import {SaveIntl as Save} from '../../src/components/save';
import {renderWithIntl, shallowRender, shallowRenderOutput } from '../testhelper';
import { IntlProvider } from 'react-intl';

describe('Save', () => {
  let map, onClick, saveComponent;
  const intlProvider = new IntlProvider({locale: 'en'}, {});
  const {intl} = intlProvider.getChildContext();
  beforeEach(function() {
    map = new ol.Map({});
    onClick = () => {}
		saveComponent = shallowRender( <Save.WrappedComponent intl={intl} map={map} /> );
  });
	it('exists', () => {
		assert.isDefined(ReactTestUtils.isCompositeComponent(saveComponent));
	});
  it('has a save button', () => {
    const output = shallowRenderOutput(<Save.WrappedComponent intl={intl} map={map} /> )
    assert.include(output.props.children[0].props.className, 'save')
  });
});
