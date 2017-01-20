import * as types from '../../../src/state/actiontypes'
import {setMapConfig, setAbout} from '../../../src/state/mapConfig/actions';

describe('#setMapConfig', () => {
  it('should set the config for SET_MAP_CONFIG', () => {
    const config = {test: 'Test'};
    const expectedAction = {type: types.SET_MAP_CONFIG, config: config};
    assert.deepEqual(setMapConfig(config), expectedAction);
  });
});
describe('#setAbout', () => {
  it('should set the config for SET_ABOUT', () => {
    const about = {title: 'Test'};
    const expectedAction = {type: types.SET_ABOUT, about: about};
    assert.deepEqual(setAbout(about), expectedAction);
  });
});
