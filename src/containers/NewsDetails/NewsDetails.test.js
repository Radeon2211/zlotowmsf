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
});
