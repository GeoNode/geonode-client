import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';
import ol from 'openlayers';

import ReactTestUtils from 'react-addons-test-utils';

import Save from '../src/save.jsx';
import rendererWithIntl from '../helper/renderWithIntl.js';

describe('Save', () => {
  let map;
  beforeEach(function() {
    map = new ol.Map({});
  });
	it('exists', () => {
		const saveComponent = rendererWithIntl( <Save map={map}/> );
		assert.isDefined(ReactTestUtils.isCompositeComponent(saveComponent));
	});
	it('state config is empty', () => {
    const saveComponent = ReactTestUtils.renderIntoDocument(<Save map={map} />);
    assert.deepEqual(saveComponent.state.config, {});
	});
  it('has a save button', () => {
    const saveComponent = ReactTestUtils.renderIntoDocument(<Save map={map} />);
    var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(saveComponent, 'save-item');
    var node = ReactDOM.findDOMNode(contents[0]).getElementsByTagName('button');
    assert.equal(node.length, 1);
  });
  describe('save', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
      document.body.appendChild(target);
      map = new ol.Map({
        target: target,
        layers: [],
        view: new ol.View({
          center: [0, 0],
          zoom: 1
        })
      });
    });
    afterEach(function() {
      map.setTarget(null);
      document.body.removeChild(target);
    });
    it('gets a config', () => {
      const saveComponent = ReactTestUtils.renderIntoDocument(<Save map={map}/>);
      var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(saveComponent, 'save-item');
      var node = ReactDOM.findDOMNode(contents[0]).getElementsByTagName('button');
      ReactTestUtils.Simulate.click(node[0]);
      assert.deepEqual(saveComponent.state.config, { map: {} });
    });
  });
});
