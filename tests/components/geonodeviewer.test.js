import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
raf.polyfill();
import {assert} from 'chai';
import ol from 'openlayers';

import ReactTestUtils from 'react-addons-test-utils';

import GeoNodeViewer from '../../src/components/geonode';
import rendererWithIntl from '../../helper/renderWithIntl.js';

describe('GeoNodeViewer', () => {
	let config;
  let layerSources;
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
  describe('OSM Layer', () => {
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
  describe('WMS Layer', () => {
    beforeEach(() => {
      config = { map: {
        layers: [{"opacity": 1.0, "name": "geonode:Sprint_85", "title": "Sprint_85", "source": "1", "selected": true, "visibility": true, "srs": "EPSG:900913", "bbox": [-17821432.386584494, 1997190.3387437353, -7194334.231366029, 6275272.874913283], "getFeatureInfo": {"fields": ["DBA", "Technology"], "propertyNames": {"DBA": null, "Technology": null}}, "fixed": false, "queryable": true, "schema": [{"visible": true, "name": "the_geom"}, {"visible": true, "name": "DBA"}, {"visible": true, "name": "Technology"}]}]
      },
      sources: { "1": {"ptype": "gxp_wmscsource", "url": "http://exchange-dev.boundlessps.com/geoserver/wms", "restUrl": "/gs/rest", "isVirtualService": false, "title": "Local Geoserver"}}
      };
    });
		it('layer list has one layer', () => {
			const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer config={config}/></IntlProvider>);
			var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list-item');
			assert.equal(contents.length, 1);
		});
    it('the layer list includes layers name', () => {
			const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer config={config}/></IntlProvider>);
      var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list-item');
			assert.equal(contents[0].textContent,'Sprint_85');
    });
		describe('two layers', () => {
			beforeEach(() => {
				config = { map: {
					layers: [{"opacity": 1.0, "name": "geonode:Sprint_85", "title": "Sprint_85", "source": "1", "selected": true, "visibility": true, "srs": "EPSG:900913", "bbox": [-17821432.386584494, 1997190.3387437353, -7194334.231366029, 6275272.874913283], "getFeatureInfo": {"fields": ["DBA", "Technology"], "propertyNames": {"DBA": null, "Technology": null}}, "fixed": false, "queryable": true, "schema": [{"visible": true, "name": "the_geom"}, {"visible": true, "name": "DBA"}, {"visible": true, "name": "Technology"}]},{"opacity": 1.0, "name": "geonode:Sprint_85", "title": "Sprint_85", "source": "1", "selected": true, "visibility": true, "srs": "EPSG:900913", "bbox": [-17821432.386584494, 1997190.3387437353, -7194334.231366029, 6275272.874913283], "getFeatureInfo": {"fields": ["DBA", "Technology"], "propertyNames": {"DBA": null, "Technology": null}}, "fixed": false, "queryable": true, "schema": [{"visible": true, "name": "the_geom"}, {"visible": true, "name": "DBA"}, {"visible": true, "name": "Technology"}]}]
				},
				sources: { "1": {"ptype": "gxp_wmscsource", "url": "http://exchange-dev.boundlessps.com/geoserver/wms", "restUrl": "/gs/rest", "isVirtualService": false, "title": "Local Geoserver"}}
				};
			});
			it('layer list has two layer', () => {
				const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer config={config}/></IntlProvider>);
				var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list-item');
				assert.equal(contents.length, 2);
			});
    });
	});
  describe('modes', () => {
    beforeEach(() => {
      config = { map: {
        layers: [{"opacity": 1.0, "name": "geonode:Sprint_85", "title": "Sprint_85", "source": "1", "selected": true, "visibility": true, "srs": "EPSG:900913", "bbox": [-17821432.386584494, 1997190.3387437353, -7194334.231366029, 6275272.874913283], "getFeatureInfo": {"fields": ["DBA", "Technology"], "propertyNames": {"DBA": null, "Technology": null}}, "fixed": false, "queryable": true, "schema": [{"visible": true, "name": "the_geom"}, {"visible": true, "name": "DBA"}, {"visible": true, "name": "Technology"}]}]
      },
      sources: { "1": {"ptype": "gxp_wmscsource", "url": "http://exchange-dev.boundlessps.com/geoserver/wms", "restUrl": "/gs/rest", "isVirtualService": false, "title": "Local Geoserver"}}
      };
      layerSources = [{title: '', url: '', type: '' }];
    });
    describe('viewer (default)', () => {
      it('the layer list includes layers name', () => {
        const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer config={config}/></IntlProvider>);
        var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list-item');
        assert.equal(contents[0].textContent,'Sprint_85');
      });
    });
    describe('composer', () => {
      it('can remove layers', () => {
        const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer mode='composer' addLayerSources={layerSources} config={config}/></IntlProvider>);
        var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list-item');
        var node = ReactDOM.findDOMNode(contents[0]).getElementsByClassName('layer-list-item-remove');
				assert.equal(node.length, 1);
      });
      it('can add layers', () => {
        const geonodeviewer = ReactTestUtils.renderIntoDocument(<IntlProvider locale="en"><GeoNodeViewer mode='composer' addLayerSources={layerSources} config={config}/></IntlProvider>);
        var contents = ReactTestUtils.scryRenderedDOMComponentsWithClass(geonodeviewer, 'layer-list-add');
				assert.equal(contents.length, 1);
      });
    });
  });
});
