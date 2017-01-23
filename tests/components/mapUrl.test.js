import MapUrl from '../../src/components/mapUrl';
import {shallowRender, shallowRenderOutput } from '../testhelper';
import ReactTestUtils from 'react-addons-test-utils';

describe('mapUrl', () => {
  let mapUrlComponent, url;
  beforeEach(function() {
    url = 'http://geonode.org';
		mapUrlComponent = shallowRenderOutput( <MapUrl url={url}/> );
  });
	it('exists', () => {
		mapUrlComponent = shallowRender( <MapUrl /> );
		assert.isDefined(ReactTestUtils.isCompositeComponent(mapUrlComponent));
	});
	it('has a link with class map-url', () => {
    const urlWrapper = mapUrlComponent.props.children;
		assert.equal(urlWrapper.props.className, 'map-url');
	});
	it('has the correct link', () => {
    const urlWrapper = mapUrlComponent.props.children;
		assert.equal(urlWrapper.props.href, url);
	});
});
