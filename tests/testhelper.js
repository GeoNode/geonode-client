import { IntlProvider } from 'react-intl';
import ReactTestUtils from 'react-addons-test-utils';

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
