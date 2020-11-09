import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import NewsDetails from './NewsDetails';
import * as SC from './NewsDetails.sc';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import { checkProps } from '../../shared/utility';

const mockStore = configureMockStore([thunk]);

const defaultNewsDetails = {
  title: { rendered: 'test title' },
  acf: { thumbnail: 'data:image' },
  date: Date.now(),
  content: { rendered: 'test content' },
  images: [{ id: 1, source_url: 'data:image' }],
};

const createStore = (newsDetails, isError) =>
  mockStore({
    news: { newsDetails },
    ui: { isError },
  });

const defaultProps = { match: { params: { slug: 'test-slug' } } };

const setUp = (newsDetails, isError = false) => {
  const store = createStore(newsDetails, isError);
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NewsDetails {...defaultProps} />
      </ThemeProvider>
    </Provider>,
  );
};

describe('<NewsDetails />', () => {
  global.scrollTo = jest.fn();

  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(NewsDetails, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(NewsDetails, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render <Loader /> and NOT <SC.Wrapper />', () => {
      const wrapper = setUp(null);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });

    it('Should render <Heading /> and NOT <SC.Wrapper />', () => {
      const wrapper = setUp(undefined);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find(Heading)).toHaveLength(1);
    });

    it('Should render and <SC.Wrapper /> and NOT render error', () => {
      const wrapper = setUp(defaultNewsDetails);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
