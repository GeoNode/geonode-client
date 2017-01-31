import fetchMock from 'fetch-mock';

import {saveToGeonode, getLocalGeoServer, getMapConfigFromMap, __RewireAPI__ as geonodeServiceRewireAPI} from '../../src/services/geonode';

describe('saveToGeonode', () => {
  beforeEach(function() {
		document.cookie = "csrftoken=1;";
  });
  describe('new map', () => {
    let server = 'http://geonode.org';
    describe('success', () => {
      beforeEach(() => {
        fetchMock
        .post('http://geonode.org/maps/new/data', {result: ''});
      });
      afterEach(() => {
        fetchMock.restore();
      });
      it('returns result', () => {
        return assert.becomes(saveToGeonode(server,{}), {result: ''});
      });
    });
    describe('failure', () => {
      beforeEach(() => {
        server = 'http://geonode.org';
        fetchMock
        .post('http://geonode.org/maps/new/data', 404);
      });
      afterEach(() => {
        fetchMock.restore();
      });
      it('is Rejected with Not found', () => {
        return assert.isRejected(saveToGeonode(server,{}),'Not Found');
      });
    });
  });
  describe('edit map', () => {
    let server = 'http://geonode.org';
    describe('success', () => {
      beforeEach(() => {
        fetchMock
        .put('http://geonode.org/maps/1/data', {result: ''});
      });
      afterEach(() => {
        fetchMock.restore();
      });
      it('returns result', () => {
        return assert.becomes(saveToGeonode(server,{}, 1), {result: ''});
      });
    });
    describe('failure', () => {
      beforeEach(() => {
        server = 'http://geonode.org';
        fetchMock
        .put('http://geonode.org/maps/1/data', 404);
      });
      afterEach(() => {
        fetchMock.restore();
      });
      it('is Rejected with Not found', () => {
        return assert.isRejected(saveToGeonode(server,{}, 1),'Not Found');
      });
    });
  });
});
describe('#getMapConfigFromMap', () => {
  beforeEach(() => {
    geonodeServiceRewireAPI.__Rewire__('MapConfigTransformService', {
      write: function() { return 'Test' }
    });
    geonodeServiceRewireAPI.__Rewire__('MapConfigService', {
      save: function() { return 'Test' }
    });
  });
  afterEach(() => {
    geonodeServiceRewireAPI.__ResetDependency__('MapConfigService');
    geonodeServiceRewireAPI.__ResetDependency__('MapConfigTransformService');
  });
  it('returns config', () => {
    assert.equal(getMapConfigFromMap({}),'Test');
  });
});
describe('#getLocalGeoServer', () => {
  it('returns local geoserver', () => {
    let sources = {"1": {"ptype": "gxp_olsource"}, "0": {"url": "http://localhost:8080/geoserver/wms?access_token=Qq039tZU0UhzRlK1qpVMY562jI3wAn", "restUrl": "/gs/rest", "ptype": "gxp_wmscsource", "title": "Local Geoserver"}, "3": {"url": "http://localhost:8080/geoserver/wms", "restUrl": "/gs/rest", "ptype": "gxp_wmscsource", "title": "Local Geoserver"}, "2": {"ptype": "gxp_osmsource"}};
    assert.equal(getLocalGeoServer(sources, 'http://localhost:8080/geoserver/').url, 'http://localhost:8080/geoserver/wms?access_token=Qq039tZU0UhzRlK1qpVMY562jI3wAn');
  });
});

