import React from 'react';
import { mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import CommunityAndGalleryList from './CommunityAndGalleryList';
import * as SC from './CommunityAndGalleryList.sc';
import { checkProps } from '../../shared/utility';

const createProps = (items, mainPath = '/galeria/id/', overlayText = 'Zobacz zdjęcia') => ({
  items,
  mainPath,
  overlayText,
});

const createItem = (id, title = 'title 1', slug = 'title-1') => ({
  id,
  title: { rendered: title },
  acf: { thumbnail: 'data:image' },
  slug,
});

const defaultProps = createProps([createItem(1)]);

const setUp = (props = defaultProps) => {
  return mount(
    <Router>
      <ThemeProvider theme={theme}>
        <CommunityAndGalleryList {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<CommunityAndGalleryList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(CommunityAndGalleryList, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(CommunityAndGalleryList, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render one <SC.Panel /> with default data', () => {
      const wrapper = setUp();
      expect(wrapper.find(SC.Panel)).toHaveLength(1);
      expect(wrapper.find(SC.Panel).prop('to')).toBe('/galeria/id/title-1');
      expect(wrapper.find('.image-wrapper')).toHaveLength(1);
      expect(wrapper.find('.image-overlay')).toHaveLength(1);
      expect(wrapper.find('.image-overlay-content').text()).toBe('Zobacz zdjęcia');
      expect(wrapper.find('.image').prop('src')).toBe('data:image');
      expect(wrapper.find('.image').prop('alt')).toBe('title 1');
      expect(wrapper.find('.panel-title').text()).toBe('title 1');
    });

    it('Should render three <SC.Panel />', () => {
      const props = createProps([createItem(1), createItem(2), createItem(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Panel)).toHaveLength(3);
    });

    it('Should render decoded title', () => {
      const props = createProps([createItem(1, '&#60;title&#62;', 'title')]);
      const wrapper = setUp(props);
      expect(wrapper.find('.panel-title').text()).toBe('<title>');
      expect(wrapper.find('.image').prop('alt')).toBe('<title>');
    });
  });
});
