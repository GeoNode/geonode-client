import {MapUrl} from '../../src/components/mapUrl';
import {shallowRender, shallowRenderOutput } from '../testhelper';
import ReactTestUtils from 'react-addons-test-utils';

describe('mapUrl', () => {
  let mapUrlComponent, url, muiTheme;
  beforeEach(function() {
    url = 'http://geonode.org';
    muiTheme = { palette: { primary1Color: '', alternateTextColor: ''}};
		mapUrlComponent = shallowRenderOutput( <MapUrl text='Test' url={url} muiTheme={muiTheme}/> );
  });
	it('exists', () => {
		mapUrlComponent = shallowRender( <MapUrl muiTheme={muiTheme} url='' text=''/> );
		assert.isDefined(ReactTestUtils.isCompositeComponent(mapUrlComponent));
	});
	it('has a link with class map-url', () => {
    const urlWrapper = mapUrlComponent.props.children[0];
		assert.equal(urlWrapper.props.className, 'map-url');
	});
	it('has the correct link', () => {
    const urlWrapper = mapUrlComponent.props.children[0];
		assert.equal(urlWrapper.props.href, url);
	});
});
