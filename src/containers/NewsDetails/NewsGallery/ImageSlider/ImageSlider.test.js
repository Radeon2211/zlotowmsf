import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../styled/theme';
import ImageSlider from './ImageSlider';
import ImageSlide from '../ImageSlide/ImageSlide';
import * as SC from './ImageSlider.sc';

const defaultProps = {
  isVisible: true,
  closed: jest.fn(),
  goToPrev: jest.fn(),
  goToNext: jest.fn(),
};

const setUp = (props = defaultProps) => {
  return mount(
    <ThemeProvider theme={theme}>
      <ImageSlider {...props}>
        <ImageSlide isVisible closed={jest.fn()}>
          <img src="data:image" alt="" />
        </ImageSlide>
      </ImageSlider>
    </ThemeProvider>,
  );
};

describe('<ImageSlider />', () => {
  describe('Check if elements render correctly', () => {
    it('Should render <SC.Wrapper />', () => {
      const wrapper = setUp();
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });

    it('Should NOT render <SC.Wrapper />', () => {
      const wrapper = setUp({ ...defaultProps, isVisible: false });
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });
  });

  describe('Check if handlers are called correctly', () => {
    it('Should call two times closed() method', () => {
      const closeFn = jest.fn();
      const wrapper = setUp({ ...defaultProps, closed: closeFn });
      const backdrop = wrapper.find(SC.Backdrop);
      const closeButton = wrapper.find('[data-test="close-button"]').first();
      backdrop.simulate('click');
      closeButton.simulate('click');
      expect(closeFn.mock.calls).toHaveLength(2);
    });

    it('Should call one time goToPrev() method', () => {
      const goToPrevFn = jest.fn();
      const wrapper = setUp({ ...defaultProps, goToPrev: goToPrevFn });
      const prevButton = wrapper.find('[data-test="prev-button"]').first();
      prevButton.simulate('click');
      expect(goToPrevFn.mock.calls).toHaveLength(1);
    });

    it('Should call one time goToNext() method', () => {
      const goToNextFn = jest.fn();
      const wrapper = setUp({ ...defaultProps, goToNext: goToNextFn });
      const nextButton = wrapper.find('[data-test="next-button"]').first();
      nextButton.simulate('click');
      expect(goToNextFn.mock.calls).toHaveLength(1);
    });
  });
});
