import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import ParishCommunities from './ParishCommunities';
import CommunityAndGalleryList from '../../components/CommunityAndGalleryList/CommunityAndGalleryList';
import Loader from '../../components/UI/Loader';

const mockStore = configureMockStore([thunk]);

const createCommunity = (id) => ({
  id,
  acf: { thumnail: 'data:image' },
  title: { rendered: 'test title' },
});

const createStore = (communities, isError) =>
  mockStore({
    community: { communities },
    ui: { isError },
  });

const setUp = (communities, isError = false) => {
  const store = createStore(communities, isError);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <ParishCommunities />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<ParishCommunities />', () => {
  global.scrollTo = jest.fn();

  describe('Check if elements render correctly', () => {
    it('Should render <Loader />', () => {
      const wrapper = setUp(null, false);
      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('Should render not found <Heading />', () => {
      const wrapper = setUp([], false);
      expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
    });

    it('Should render and <CommunityAndGalleryList /> and NOT render error', () => {
      const wrapper = setUp([createCommunity(1)]);
      expect(wrapper.find(CommunityAndGalleryList)).toHaveLength(1);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
