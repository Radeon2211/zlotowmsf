import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import theme from '../../../styled/theme';
import NewsList from './NewsList';
import * as SC from './NewsList.sc';
import NewsItem from './NewsItem/NewsItem';
import Heading from '../../../components/UI/Heading/Heading';
import Loader from '../../../components/UI/Loader';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import { checkProps } from '../../../shared/utility';

const mockStore = configureMockStore([thunk]);

const createStore = (isLoading, isError) =>
  mockStore({
    ui: { isLoading, isError },
  });

const createProps = (news) => ({
  news,
});

const createHistory = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
  createHref: jest.fn(),
  push: jest.fn(),
});

const createNews = (id) => ({
  id,
  title: { rendered: 'test title' },
  acf: { thumbnail: 'data:image' },
  date: Date.now(),
  excerpt: { rendered: 'test excerpt' },
  slug: 'test slug',
});

const defaultProps = createProps([createNews(1)]);
const defaultStore = createStore(false, false);
const defaultHistory = createHistory(1);

const setUp = (props = defaultProps, store = defaultStore, history = defaultHistory) => {
  return mount(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NewsList {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<NewsList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(NewsList, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(NewsList, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render <Loader /> and NOT <SC.Wrapper /> and NOT render error', () => {
      const props = createProps(null);
      const store = createStore(true, false);
      const wrapper = setUp(props, store);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render <SC.Wrapper />, one <NewsItem /> and NOT <Loader /> and <LoadingOverlay />', () => {
      const wrapper = setUp();
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find(NewsItem)).toHaveLength(1);
      expect(wrapper.find(Loader)).toHaveLength(0);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
    });

    it('Should render <Heading /> and NOT <SC.Wrapper />', () => {
      const props = createProps([]);
      const wrapper = setUp(props);
      expect(wrapper.find(Heading)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });

    it('Should render <LoadingOverlay />', () => {
      const props = createProps([createNews(1)]);
      const store = createStore(true, false);
      const wrapper = setUp(props, store);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    });

    it('Should render three <NewsItem />', () => {
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(NewsItem)).toHaveLength(3);
    });

    it('Should render three <NewsItem />', () => {
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(NewsItem)).toHaveLength(3);
    });

    it('Should render first <NewsItem /> with newest attribute and rest without if page number is 1', () => {
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(NewsItem).first().props().newest).toBe(true);
      expect(wrapper.find(NewsItem).filterWhere((item) => item.prop('newest'))).toHaveLength(1);
    });

    it('Should render all <NewsItem /> without newest attribute if page number is greater than 1', () => {
      const history = createHistory(2);
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props, defaultStore, history);
      expect(wrapper.find(NewsItem).filterWhere((item) => item.prop('newest'))).toHaveLength(0);
    });

    it('Should render error', () => {
      const store = createStore(false, true);
      const wrapper = setUp(null, store);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
