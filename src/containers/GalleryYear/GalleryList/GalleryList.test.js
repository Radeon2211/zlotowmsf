import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import theme from '../../../styled/theme';
import GalleryList from './GalleryList';
import * as SC from './GalleryList.sc';
import Loader from '../../../components/UI/Loader';
import { checkProps } from '../../../shared/utility';

const mockStore = configureMockStore([thunk]);

const createStore = (isError) =>
  mockStore({
    ui: { isError },
  });

const createProps = (galleries, galleriesYear = '2020') => ({
  galleries,
  galleriesYear,
});

const createHistory = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}` },
  createHref: jest.fn(),
  push: jest.fn(),
});

const createGallery = (id) => ({
  id,
  title: { rendered: 'test title' },
  acf: { thumbnail: 'data:image' },
});

const defaultProps = createProps([createGallery(1)], '2020');
const defaultStore = createStore(false);
const defaultHistory = createHistory(1);

const setUp = (props = defaultProps, store = defaultStore, history = defaultHistory) => {
  return mount(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GalleryList {...props} />
        </ThemeProvider>
      </Provider>
    </Router>,
  );
};

describe('<GalleryList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(GalleryList, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(GalleryList, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render <Loader /> and NOT render error and <SC.GalleryList />', () => {
      const props = createProps(null);
      const wrapper = setUp(props);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.GalleryList)).toHaveLength(0);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render year <Heading /> and one <SC.SingleGallery /> and NOT <Loader />', () => {
      const wrapper = setUp();
      expect(wrapper.find(SC.SingleGallery)).toHaveLength(1);
      expect(wrapper.find('[data-test="year"]').length).toBeGreaterThan(0);
      expect(wrapper.find(Loader)).toHaveLength(0);
    });

    it('Should render not found <Heading />', () => {
      const props = createProps([]);
      const wrapper = setUp(props);
      expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
    });

    it('Should render three <SC.SingleGallery />', () => {
      const props = createProps([createGallery(1), createGallery(2), createGallery(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(SC.SingleGallery)).toHaveLength(3);
    });

    it('Should render error', () => {
      const props = createProps(null);
      const store = createStore(true);
      const wrapper = setUp(props, store);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
