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

const mockStore = configureMockStore([thunk]);

const defaultNewsDetails = {
  title: { rendered: 'test title' },
  acf: { thumbnail: 'data:image' },
  date: Date.now(),
  content: { rendered: 'test content' },
  images: [{ id: 1, source_url: 'data:image' }],
};

const createStore = (newsDetails) => mockStore({
  data: { newsDetails },
});

const defaultProps = { match: { params: { slug: 'test slug' }} };

const setUp = (newsDetails) => {
  const store = createStore(newsDetails);
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

    it('Should render gallery section and <SC.Wrapper />', () => {
      const wrapper = setUp(defaultNewsDetails);
      expect(wrapper.find('.gallery-section')).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });

    it('Should NOT render gallery section', () => {
      const wrapper = setUp({ ...defaultNewsDetails, images: undefined });
      expect(wrapper.find('.gallery-section')).toHaveLength(0);
    });
  });

  // describe('Check if elements render correctly', () => {
  //   it('Should render <Loader /> and NOT <SC.Wrapper />', () => {
  //     const props = createProps(null);
  //     const wrapper = setUp(props, defaultHistory);
  //     expect(wrapper.find(Loader)).toHaveLength(1);
  //     expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
  //   });

  //   it('Should render <SC.Wrapper />, one <NewsItem /> and NOT <Loader /> and <LoadingOverlay />', () => {
  //     const wrapper = setUp(defaultProps, defaultHistory);
  //     expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
  //     expect(wrapper.find(NewsItem)).toHaveLength(1);
  //     expect(wrapper.find(Loader)).toHaveLength(0);
  //     expect(wrapper.find(LoadingOverlay)).toHaveLength(0);
  //   });

  //   it('Should render <Heading /> and NOT <SC.Wrapper />', () => {
  //     const props = createProps([]);
  //     const wrapper = setUp(props, defaultHistory);
  //     expect(wrapper.find(Heading)).toHaveLength(1);
  //     expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
  //   });

  //   it('Should render <LoadingOverlay />', () => {
  //     const props = createProps([createNews(1)], true);
  //     const wrapper = setUp(props, defaultHistory);
  //     expect(wrapper.find(LoadingOverlay)).toHaveLength(1);
  //   });

  //   it('Should render three <NewsItem />', () => {
  //     const props = createProps([createNews(1), createNews(2), createNews(3)]);
  //     const wrapper = setUp(props, defaultHistory);
  //     expect(wrapper.find(NewsItem)).toHaveLength(3);
  //   });

  //   it('Should render three <NewsItem />', () => {
  //     const props = createProps([createNews(1), createNews(2), createNews(3)]);
  //     const wrapper = setUp(props, defaultHistory);
  //     expect(wrapper.find(NewsItem)).toHaveLength(3);
  //   });

  //   it('Should render first <NewsItem /> with newest attribute and rest without if page number is 1', () => {
  //     const props = createProps([createNews(1), createNews(2), createNews(3)]);
  //     const wrapper = setUp(props, defaultHistory);
  //     expect(wrapper.find(NewsItem).first().props().newest).toBe(true);
  //     expect(wrapper.find(NewsItem).filterWhere((item) => item.prop('newest'))).toHaveLength(1);
  //   });
  //   it('Should render all <NewsItem /> without newest attribute if page number is greater than 1', () => {
  //     const history = createHistory(2);
  //     const props = createProps([createNews(1), createNews(2), createNews(3)]);
  //     const wrapper = setUp(props, history);
  //     expect(wrapper.find(NewsItem).filterWhere((item) => item.prop('newest'))).toHaveLength(0);
  //   });
  // });
});
