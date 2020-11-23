import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import GalleryYear from './GalleryYear';
import CommunityAndGalleryList from '../../components/CommunityAndGalleryList/CommunityAndGalleryList';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/UI/Loader';
import { checkProps } from '../../shared/utility';

const mockStore = configureMockStore([thunk]);

const createGallery = (id) => ({
  id,
  acf: { thumnail: 'data:image' },
  title: { rendered: 'test title' },
});

const createStore = (galleries, galleryCount, isError) =>
  mockStore({
    gallery: { galleries, galleryCount },
    ui: { isError },
  });

const defaultProps = { match: { params: { year: '2020' } } };

const setUp = (galleries, galleryCount = 0, isError = false) => {
  const store = createStore(galleries, galleryCount, isError);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <GalleryYear {...defaultProps} />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<GalleryYear />', () => {
  global.scrollTo = jest.fn();

  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(GalleryYear, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(GalleryYear, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render <Loader />', () => {
      const wrapper = setUp(null, 0, false);
      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('Should render not found <Heading />', () => {
      const wrapper = setUp([], 0, false);
      expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
    });

    it('Should render year <Heading /> and <CommunityAndGalleryList /> and NOT render <Pagination /> and error', () => {
      const wrapper = setUp([createGallery(1)], 1);
      expect(wrapper.find(CommunityAndGalleryList)).toHaveLength(1);
      expect(wrapper.find('[data-test="year"]').length).toBeGreaterThan(0);
      expect(wrapper.find(Pagination)).toHaveLength(0);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render <Pagination /> if gallery count is greater than 12', () => {
      const wrapper = setUp([createGallery(1)], 15);
      expect(wrapper.find(Pagination)).toHaveLength(1);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, 0, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
