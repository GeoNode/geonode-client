import 'phantomjs-polyfill-object-assign';
import raf from 'raf';
import Dialog from 'material-ui/Dialog';
raf.polyfill();
import {assert} from 'chai';
import td from 'testdouble';

import {SaveView, SaveViewIntl} from '../../src/components/saveView';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {renderWithIntl, shallowWithIntl, shallowWithIntlAndTheme, mountWithIntl, mountWithIntlAndTheme} from '../testhelper'
import ReactTestUtils from 'react-addons-test-utils';


const intlProvider = new IntlProvider({locale: 'en'}, {});
const {intl} = intlProvider.getChildContext();

describe('SaveView', () => {
  beforeEach(function() {
  });
	it('exists', () => {
    const wrapper = shallowWithIntl(<SaveView />, {});
    expect(wrapper).to.have.length(1);
	});
	it('closes on cancel', () => {
    const close = td.function();
    const wrapper = mountWithIntlAndTheme(
      <SaveView open={true} close={close}/>
    );
    wrapper.instance()._handleClose();
    expect(close).to.have.been.called;
	});
	it('calls save', () => {
		const onButtonClick = td.function();
    const wrapper = mountWithIntlAndTheme(
      <SaveView open={true} save={onButtonClick}/>
    );
    wrapper.instance()._handleSave();
    expect(onButtonClick).to.have.been.called;
	});
	it('sets title error correctly', () => {
    const wrapper = shallowWithIntl(<SaveView />, {});
    wrapper.setProps({titleError: true});
    expect(wrapper.state('msg')).to.eq('Please add a title');
    expect(wrapper.state('error')).to.eq(true);
    expect(wrapper.state('errorOpen')).to.eq(true);
	});
	it('has two text fields', () => {
    const wrapper = mountWithIntlAndTheme(
      <SaveView open={true}/>
    );
    const dialog = document.getElementsByClassName('save-map-modal')[0];
    expect(dialog.getElementsByTagName('input').length).to.equal(2);
	});
});
