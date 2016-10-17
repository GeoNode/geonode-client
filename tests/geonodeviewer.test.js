import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';
import ol from 'openlayers';

import ReactTestUtils from 'react-addons-test-utils';

import GeoNodeViewer from '../geonode.jsx';
import rendererWithIntl from '../helper/renderWithIntl.js';

describe('GeoNodeViewer', () => {
	let config;
	beforeEach(() => {
		config = { map: { layers: [] }};
	});
	it('exists', () => {
		const geonodeviewer = rendererWithIntl( <GeoNodeViewer config={config}/> );
		assert.isDefined(ReactTestUtils.isCompositeComponent(geonodeviewer));
	});
	it('has a root div', () => {
		const renderer = ReactTestUtils.createRenderer();
		renderer.render(<GeoNodeViewer config={config} />);
		let result = renderer.getRenderOutput();
		assert.equal(result.type, 'div')
	});
  describe('one layer', () => {
    beforeEach(() => {
      config = { map: {
        layers: [{"opacity": 1.0, "group": "background", "name": "mapnik", "visibility": true, "source": "0", "fixed": true, "type": "OpenLayers.Layer.OSM"}]
      },
      sources: { "0": {"ptype": "gxp_osmsource"} }
      };
    });
    it('the layer list includes one layer', () => {
			const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer config={config}/></IntlProvider>);
      var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list');
			assert.equal(contents[0].textContent,'Base Mapsmapnik');
    });
	});
});
