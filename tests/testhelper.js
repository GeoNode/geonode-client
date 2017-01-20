import { IntlProvider, intlShape } from 'react-intl';
import ReactTestUtils from 'react-addons-test-utils';
import { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export function renderWithIntl(element) {
  let instance;

  ReactTestUtils.renderIntoDocument(
    <IntlProvider locale='en'>
      {React.cloneElement(element, {ref: (c) => instance = c.refs.wrappedInstance})}
    </IntlProvider>
  );

  return instance;
}
export function shallowRender(element) {
  const renderer = ReactTestUtils.createRenderer();
  return renderer.render( element);
}
export function shallowRenderOutput(element) {
  const renderer = ReactTestUtils.createRenderer();
  renderer.render( element);
  return renderer.getRenderOutput();
}

/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */


// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
// const messages = require('../locales/en'); // en.json

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en'}, {});
const { intl } = intlProvider.getChildContext();
const { muiTheme } = getMuiTheme();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, {context}) {
    return shallow(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, {intl}),
        }
    );
}
export function shallowWithIntlAndTheme(node) {
  const muiTheme = getMuiTheme();
  return shallowWithIntl(node, {context: {muiTheme}, childContextTypes: { muiTheme: React.PropTypes.object}});
}

export function mountWithIntl(node, { context, childContextTypes }) {
    return mount(
        nodeWithIntlProp(node),
        {
          context: Object.assign({}, context, {intl}),
          childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes)
        }
    );
}
export function mountWithIntlAndTheme(node) {
  const muiTheme = getMuiTheme();
  return mountWithIntl(node, {context: {muiTheme}, childContextTypes: { muiTheme: React.PropTypes.object}});
}
