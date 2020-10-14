import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import NewsList from './NewsList';
import * as SC from './NewsList.sc';
import NewsItem from './NewsItem/NewsItem';
import Heading from '../../../components/UI/Heading/Heading';
import Loader from '../../../components/UI/Loader';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import { checkProps } from '../../../shared/utility';

const setUp = (props = {}, history) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <NewsList {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const createProps = (news, isNewsLoading = false) => ({
  news,
  isNewsLoading,
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
const defaultHistory = createHistory(1);

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
    it('Should render <Loader /> and NOT <SC.Wrapper />', () => {
      const props = createProps(null);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });

    it('Should render <SC.Wrapper />, one <NewsItem /> and NOT <Loader /> and <LoadingOverlay />', () => {
      const wrapper = setUp(defaultProps, defaultHistory);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find(NewsItem)).toHaveLength(1);
      expect(wrapper.find(Loader)).toHaveLength(0);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
    });

    it('Should render <Heading /> and NOT <SC.Wrapper />', () => {
      const props = createProps([]);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(Heading)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });

    it('Should render <LoadingOverlay />', () => {
      const props = createProps([createNews(1)], true);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
    });

    it('Should render three <NewsItem />', () => {
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(NewsItem)).toHaveLength(3);
    });

    it('Should render three <NewsItem />', () => {
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(NewsItem)).toHaveLength(3);
    });

    it('Should render first <NewsItem /> with newest attribute and rest without if page number is 1', () => {
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(NewsItem).first().props().newest).toBe(true);
      expect(wrapper.find(NewsItem).filterWhere((item) => item.prop('newest'))).toHaveLength(1);
    });
    it('Should render all <NewsItem /> without newest attribute if page number is greater than 1', () => {
      const history = createHistory(2);
      const props = createProps([createNews(1), createNews(2), createNews(3)]);
      const wrapper = setUp(props, history);
      expect(wrapper.find(NewsItem).filterWhere((item) => item.prop('newest'))).toHaveLength(0);
    });
  });
});
