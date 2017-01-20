import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
import Dialog from 'material-ui/Dialog';
raf.polyfill();
import {assert} from 'chai';
import td from 'testdouble';

import {SaveContainer, SaveContainerIntl} from '../../src/components/saveContainer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {renderWithIntl, shallowWithIntl, mountWithIntl, mountWithIntlAndTheme} from '../testhelper';
import ReactTestUtils from 'react-addons-test-utils';


const intlProvider = new IntlProvider({locale: 'en'}, {});
const {intl} = intlProvider.getChildContext();

describe('SaveContainer', () => {
  beforeEach(function() {
  });
	it('exists', () => {
    const wrapper = shallowWithIntl(<SaveContainer />, {});
    expect(wrapper).to.have.length(1);
	});
	it('sets the state correctly', () => {
    const wrapper = shallowWithIntl(<SaveContainer />, {});
    expect(wrapper.state('error')).to.equal(false);
    expect(wrapper.state('open')).to.equal(false);
	});
	it('closes on cancel', () => {
    const wrapper = mountWithIntlAndTheme(
      <SaveContainer />
    );
    wrapper.setState({open: true});
    wrapper.instance().close();
    expect(wrapper.state('open')).to.equal(false);
	});
	it('does not save withput a title', () => {
		const onButtonClick = td.function();
    const wrapper = mountWithIntlAndTheme(
      <SaveContainer setAbout={onButtonClick}/>
    );
    wrapper.setState({open: true});
    wrapper.instance().save();
    expect(onButtonClick).to.not.have.been.called;
	});
	it('can save', () => {
		const setAbout= td.function();
		const saveMap = td.function();
    const wrapper = shallowWithIntl(<SaveContainer saveAbout={setAbout} save={saveMap}/>, {});
    wrapper.instance().save('Title');
    expect(setAbout).to.have.been.called;
	});
  it('closes it on save success', () => {
    const wrapper = shallowWithIntl(<SaveContainer/>, {});
    wrapper.setProps({success: true});
    expect(wrapper.state('open')).to.equal(false);
  });
  it('sets error witrh the message', () => {
    const wrapper = shallowWithIntl(<SaveContainer/>, {});
    wrapper.setProps({success: false, error: true, msg: 'Error'});
    expect(wrapper.state('error')).to.equal(true);
  });
});
