import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import ImageGallery from './ImageGallery';
import * as SC from './ImageGallery.sc';
import { checkProps } from '../../shared/utility';

const createProps = (images, galleryHeading = true) => ({
  images,
  galleryHeading,
});

const createImage = (id, sourceURL = 'data:image', altText = 'test-alt') => ({
  id,
  source_url: sourceURL,
  alt_text: altText,
});

const defaultProps = createProps([createImage(1)]);

const setUp = (props = defaultProps) => {
  return mount(
    <ThemeProvider theme={theme}>
      <ImageGallery {...props} />
    </ThemeProvider>,
  );
};

describe('<ImageGallery />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(ImageGallery, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(ImageGallery, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render one <SC.GalleryItem /> with default data', () => {
      const wrapper = setUp();
      expect(wrapper.find('[data-test="heading"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="click-photo"]').length).toBeGreaterThan(0);
      expect(wrapper.find(SC.GalleryItem)).toHaveLength(1);
    });

    it('Should NOT render gallery <Heading />', () => {
      const props = createProps([createImage(1)], false);
      const wrapper = setUp(props);
      expect(wrapper.find('[data-test="heading"]')).toHaveLength(0);
    });

    it('Should render three <SC.GalleryItem />', () => {
      const props = createProps([createImage(1), createImage(2), createImage(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(SC.GalleryItem)).toHaveLength(3);
    });
  });
});
