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
});
