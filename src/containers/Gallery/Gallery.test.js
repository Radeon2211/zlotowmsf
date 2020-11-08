import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import Gallery from './Gallery';
import * as SC from './Gallery.sc';
import Loader from '../../components/UI/Loader';

const mockStore = configureMockStore([thunk]);

const createStore = (oldestGalleryYear, newestGalleryYear, isLoading, isError) =>
  mockStore({
    gallery: { oldestGalleryYear, newestGalleryYear },
    ui: { isLoading, isError },
  });

const setUp = (
  oldestGalleryYear = null,
  newestGalleryYear = null,
  isLoading = false,
  isError = false,
) => {
  const store = createStore(oldestGalleryYear, newestGalleryYear, isLoading, isError);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Gallery />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<Gallery />', () => {
  describe('Check if elements render correctly', () => {
    it('Should render <Loader />', () => {
      const wrapper = setUp(null, null, true);
      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('Should render <SC.YearList /> and four <SC.YearPanel /> and NOT render error', () => {
      const wrapper = setUp(2017, 2020);
      expect(wrapper.find(SC.YearList)).toHaveLength(1);
      expect(wrapper.find(SC.YearPanel)).toHaveLength(4);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render one <SC.YearPanel />', () => {
      const wrapper = setUp(2020, 2020);
      expect(wrapper.find(SC.YearPanel)).toHaveLength(1);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, null, false, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
