import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from '../../../../styled/theme';
import { checkProps } from '../../../../shared/utility';
import * as SC from './Slide.sc';
import Slide from './Slide';

const mockStore = configureMockStore([thunk]);

const defaultProps = {
  isVisible: true,
  data: {
    title: { rendered: 'test title' },
    acf: {
      firstLine: 'test heading',
      imageURL: '../../../../images/background.png',
      secondLine: 'test second line',
      thirdLine: 'test third line',
      btnText: 'test btn text',
      btnInnerLink: '/',
    },
  },
};

const defaultStore = mockStore({
  data: {
    basic: {},
  },
});

const setUp = (props, store = defaultStore) => {
  return mount(
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Slide {...props} />
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

describe('<Slides />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(Slide, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(Slide, {})).not.toBe(null);
    });
  });

  describe('Check if renders correctly', () => {
    describe('Check depend on isVisible', () => {
      it('Should render <SC.Wrapper />', () => {
        const wrapper = setUp(defaultProps);
        expect(wrapper.find(SC.Wrapper)).toHaveLength(1);
      });
      it('Should NOT render <SC.Wrapper />', () => {
        const props = {
          ...defaultProps,
          isVisible: false,
        };
        const wrapper = setUp(props);
        expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      });
    });

    describe('Full slide data', () => {
      const wrapper = setUp(defaultProps);
      it('Should render second line node', () => {
        expect(wrapper.find('[data-test="second-line"]')).not.toBeNull();
      });
      it('Should render third line node', () => {
        expect(wrapper.find('.third-line')).not.toBeNull();
      });
      it('Should render button wrapper', () => {
        expect(wrapper.find('[data-test="button-wrapper"]')).not.toBeNull();
      });
    });

    describe('Minimum slide data', () => {
      const props = {
        isVisible: true,
        data: {
          title: { rendered: 'test title' },
          acf: {
            firstLine: 'test heading',
            imageURL: '../../../../images/background.png',
          },
        },
      };
      const wrapper = setUp(props);
      it('Should NOT render second line node', () => {
        expect(wrapper.find('[data-test="second-line"]')).toHaveLength(0);
      });
      it('Should NOT render third line node', () => {
        expect(wrapper.find('.third-line')).toHaveLength(0);
      });
      it('Should NOT render button wrapper', () => {
        expect(wrapper.find('[data-test="button-wrapper"]')).toHaveLength(0);
      });
    });

    describe('Check link type', () => {
      it('Should render <Link />', () => {
        const wrapper = setUp(defaultProps);
        expect(wrapper.find('[data-test="router-link"]')).not.toBeNull();
      });
      it('Should render <a /> and NOT render <Link />', () => {
        const props = {
          ...defaultProps,
          data: {
            ...defaultProps.data,
            acf: {
              ...defaultProps.data.acf,
              btnInnerLink: undefined,
              btnOuterLink: 'https://youtube.com',
            },
          },
        };
        const wrapper = setUp(props);
        expect(wrapper.find('[data-test="html-link"]')).not.toBeNull();
        expect(wrapper.find('[data-test="router-link"]')).toHaveLength(0);
      });
    });
  });
});
