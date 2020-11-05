import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '../../../../styled/theme';
import ImageSlide, { SC } from './ImageSlide';

const defaultProps = {
  isVisible: true,
  closed: jest.fn(),
};

const setUp = (props = defaultProps) => {
  return mount(
    <ThemeProvider theme={theme}>
      <ImageSlide {...props}>
        <img src="data:image" alt="" />
      </ImageSlide>
    </ThemeProvider>,
  );
};

describe('<ImageSlide />', () => {
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
    it('Should call one time closed() method', () => {
      const closeFn = jest.fn();
      const wrapper = setUp({ ...defaultProps, closed: closeFn });
      const SCWrapper = wrapper.find(SC.Wrapper);
      SCWrapper.simulate('click');
      expect(closeFn.mock.calls).toHaveLength(1);
    });
  });
});
