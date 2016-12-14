import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';
import ol from 'openlayers';

import ReactTestUtils from 'react-addons-test-utils';

import {Save} from '../../src/components/save';
import rendererWithIntl from '../../helper/renderWithIntl.js';

describe('Save', () => {
  let map, onClick;
  beforeEach(function() {
    map = new ol.Map({});
    onClick = () => {}
  });
	it('exists', () => {
		const saveComponent = rendererWithIntl( <Save onClick={onClick} map={map}/> );
		assert.isDefined(ReactTestUtils.isCompositeComponent(saveComponent));
	});
  it('has a save button', () => {
    const saveComponent = ReactTestUtils.renderIntoDocument(<Save onClick={onClick} map={map} />);
    var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(saveComponent, 'save-item');
    var node = ReactDOM.findDOMNode(contents[0]).getElementsByTagName('button');
    assert.equal(node.length, 1);
  });
});
