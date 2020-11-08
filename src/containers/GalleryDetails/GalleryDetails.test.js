import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import GalleryDetails from './GalleryDetails';
import * as SC from './GalleryDetails.sc';
import Loader from '../../components/UI/Loader';
import { checkProps } from '../../shared/utility';

const mockStore = configureMockStore([thunk]);

const defaultGalleryDetails = {
  acf: { description: 'test description' },
  title: { rendered: 'test title' },
  images: [{ id: 1, source_url: 'data:image' }],
};

const createStore = (galleryDetails, isError) =>
  mockStore({
    gallery: { galleryDetails },
    ui: { isError },
  });

const defaultProps = { match: { params: { slug: 'test-slug' } } };

const setUp = (galleryDetails, isError = false) => {
  const store = createStore(galleryDetails, isError);
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GalleryDetails {...defaultProps} />
      </ThemeProvider>
    </Provider>,
  );
};

describe('<GalleryDetails />', () => {
  global.scrollTo = jest.fn();

  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(GalleryDetails, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(GalleryDetails, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render <Loader /> and NOT <SC.Wrapper />', () => {
      const wrapper = setUp(null);
      expect(wrapper.find(Loader)).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });

    it('Should render not found <Heading /> and NOT <SC.Wrapper />', () => {
      const wrapper = setUp(undefined);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find('[data-test="not-found"]')).not.toBe(null);
    });

    it('Should render gallery section and <SC.Wrapper /> and descripiton and NOT render error', () => {
      const wrapper = setUp(defaultGalleryDetails);
      expect(wrapper.find('.gallery-section')).toHaveLength(1);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
      expect(wrapper.find('.description')).toHaveLength(1);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });

    it('Should NOT render gallery section and description', () => {
      const wrapper = setUp({
        ...defaultGalleryDetails,
        images: undefined,
        acf: { ...defaultGalleryDetails.acf, description: '' },
      });
      expect(wrapper.find('.gallery-section')).toHaveLength(0);
      expect(wrapper.find('.description')).toHaveLength(0);
    });

    it('Should NOT render gallery section', () => {
      const wrapper = setUp({ ...defaultGalleryDetails, images: undefined });
      expect(wrapper.find('.gallery-section')).toHaveLength(0);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
