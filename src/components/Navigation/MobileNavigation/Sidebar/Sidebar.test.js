import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Sidebar from './Sidebar';
import * as SC from './Sidebar.sc';
import { checkProps } from '../../../../shared/utility';
import theme from '../../../../styled/theme';

const setUp = (props) => {
  return mount(
    <Router>
      <ThemeProvider theme={theme}>
        <Sidebar {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<Sidebar />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        closed: jest.fn(),
        isVisible: false,
      };
      expect(checkProps(Sidebar, props)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(Sidebar, {})).not.toBe(null);
    });
  });

  describe('Sidebar is visible', () => {
    it('Should render <SC.Backdrop /> and <SC.Sidebar />', () => {
      const props = {
        closed: jest.fn(),
        isVisible: true,
      };
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Backdrop)).toHaveLength(1);
      expect(wrapper.find(SC.Sidebar)).toHaveLength(1);
    });
    it('Should fire closed function when clicking on <SC.Backdrop />', () => {
      const closed = jest.fn();
      const props = {
        closed,
        isVisible: true,
      };
      const wrapper = setUp(props);
      const backdrop = wrapper.find(SC.Backdrop);
      backdrop.simulate('click');
      expect(closed.mock.calls).toHaveLength(1);
    });
  });

  describe('Sidebar is NOT visible', () => {
    const props = {
      closed: jest.fn(),
      isVisible: false,
    };
    const wrapper = setUp(props);
    it('Should NOT render <SC.Backdrop /> and <SC.Sidebar />', () => {
      expect(wrapper.find(SC.Backdrop)).toHaveLength(0);
      expect(wrapper.find(SC.Sidebar)).toHaveLength(0);
    });
  });
});
