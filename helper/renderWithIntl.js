import ReactTestUtils from 'react-addons-test-utils';

function renderWithIntl(element) {
  let instance;

  ReactTestUtils.renderIntoDocument(
    <IntlProvider locale='en'>
      {React.cloneElement(element, {ref: (c) => instance = c.refs.wrappedInstance})}
    </IntlProvider>
  );

  return instance;
}
export default renderWithIntl;
