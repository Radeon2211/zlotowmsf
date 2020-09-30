import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ParishSubmenu from './ParishSubmenu';
import * as SC from '../Submenu.sc';
import { checkProps } from '../../../../../shared/utility';
import theme from '../../../../../styled/theme';

const setUp = (props) => {
  return mount(
    <Router>
      <ThemeProvider theme={theme}>
        <ParishSubmenu {...props} />
      </ThemeProvider>
    </Router>
  );
};

describe('<ParishSubmenu />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      const props = {
        isVisible: true,
        sidebarClosed: jest.fn(),
        submenuClosed: jest.fn(),
      };
      expect(checkProps(ParishSubmenu, props)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(ParishSubmenu, {})).not.toBe(null);
    });
  });

  describe('ParishSubmenu is visible', () => {
    it('Should render <SC.Wrapper />', () => {
      const props = {
        isVisible: true,
        sidebarClosed: jest.fn(),
        submenuClosed: jest.fn(),
      };
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
    });
    it('Should fire sidebarClosed function when clicking on NavLinks', () => {
      const sidebarClosed = jest.fn();
      const props = {
        isVisible: true,
        sidebarClosed,
        submenuClosed: jest.fn(),
      };
      const wrapper = setUp(props);
      const navLinks = wrapper.find(NavLink);
      navLinks.forEach((link) => link.simulate('click'));
      expect(sidebarClosed.mock.calls).toHaveLength(navLinks.length);
    });
  });

  describe('ParishSubmenu is NOT visible', () => {
    const props = {
      isVisible: false,
      sidebarClosed: jest.fn(),
      submenuClosed: jest.fn(),
    };
    const wrapper = setUp(props);
    it('Should NOT render <SC.Wrapper />', () => {
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
    });
  });
});
