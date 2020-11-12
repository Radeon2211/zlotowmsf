import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import CommunityAndGalleryDetails, { SC } from './CommunityAndGalleryDetails';
import ImageGallery from '../ImageGallery/ImageGallery';
import EditorContent from '../UI/EditorContent';
import Loader from '../UI/Loader';
import { checkProps } from '../../shared/utility';
import { siteNames } from '../../shared/constants';

const defaultData = {
  title: { rendered: 'test title' },
  content: { rendered: 'test content' },
  images: [{ id: 1, source_url: 'data:image' }],
};

const defaultProps = {
  data: defaultData,
  isError: false,
  siteName: siteNames.GALLERY_DETAILS,
};

const setUp = (data, isError = false, siteName = siteNames.GALLERY_DETAILS) => {
  const props = { data, isError, siteName };
  return mount(
    <ThemeProvider theme={theme}>
      <CommunityAndGalleryDetails {...props} />
    </ThemeProvider>,
  );
};

describe('<CommunityAndGalleryDetails />', () => {
  global.scrollTo = jest.fn();

  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(CommunityAndGalleryDetails, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(CommunityAndGalleryDetails, {})).not.toBe(null);
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

    it('Should render <SC.Wrapper /> and <EditorContent /> and <ImageGallery /> and NOT render error', () => {
      const wrapper = setUp(defaultData);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      expect(wrapper.find(EditorContent)).toHaveLength(1);
      expect(wrapper.find(ImageGallery)).toHaveLength(1);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render not found <Heading /> with no gallery info', () => {
      const wrapper = setUp(undefined, false, siteNames.GALLERY_DETAILS);
      expect(
        wrapper
          .find('[data-test="not-found"]')
          .filterWhere((item) => item.html().includes('galerii')).length,
      ).toBeGreaterThan(0);
    });

    it('Should render error <Heading /> with gallery problem', () => {
      const wrapper = setUp(null, true, siteNames.GALLERY_DETAILS);
      expect(
        wrapper.find('[data-test="error"]').filterWhere((item) => item.html().includes('galerii'))
          .length,
      ).toBeGreaterThan(0);
    });

    it('Should render not found <Heading /> with no community info', () => {
      const wrapper = setUp(undefined, false, siteNames.PARISH_COMMUNITY_DETAILS);
      expect(
        wrapper
          .find('[data-test="not-found"]')
          .filterWhere((item) => item.html().includes('wspólnoty')).length,
      ).toBeGreaterThan(0);
    });

    it('Should render error <Heading /> with community problem', () => {
      const wrapper = setUp(null, true, siteNames.PARISH_COMMUNITY_DETAILS);
      expect(
        wrapper.find('[data-test="error"]').filterWhere((item) => item.html().includes('wspólnoty'))
          .length,
      ).toBeGreaterThan(0);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
