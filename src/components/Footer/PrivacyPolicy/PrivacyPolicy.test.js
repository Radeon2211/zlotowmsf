import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import PrivacyPolicy from './PrivacyPolicy';
import * as SC from './PrivacyPolicy.sc';

const mockStore = configureMockStore([thunk]);

const createStore = (privacyPolicy) =>
  mockStore({
    data: { basic: { extraInfo: { privacyPolicy } } },
  });

const createProps = (isOpen, closed) => ({
  isOpen,
  closed,
});

const defaultProps = createProps(true, () => {});

const setUp = (privacyPolicy, props = defaultProps) => {
  const store = createStore(privacyPolicy);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <PrivacyPolicy {...props} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<PrivacyPolicy />', () => {
  describe('Check if elements render correctly', () => {
    it('Should render all elements', () => {
      const wrapper = setUp('privacy policy');
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find(SC.Backdrop)).toHaveLength(1);
      expect(wrapper.find(SC.Modal)).toHaveLength(1);
      expect(wrapper.find('[data-test="heading"]').length).toBeGreaterThan(0);
      expect(wrapper.find('.content')).toHaveLength(1);
      expect(wrapper.find('.content').text()).toBe('privacy policy');
    });
  });
});
