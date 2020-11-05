import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { HashRouter as Router, Link } from 'react-router-dom';
import theme from '../../../../styled/theme';
import { checkProps } from '../../../../shared/utility';
import * as SC from './Slide.sc';
import Slide from './Slide';
import Heading from '../../../../components/UI/Heading/Heading';
import { slidesExtraInfo } from '../../../../shared/constants';

const mockStore = configureMockStore([thunk]);

const defaultImageURL = 'default image URL';
const defaultProps = {
  isVisible: true,
  data: {
    title: { rendered: 'test title' },
    acf: {
      firstLine: 'test heading',
      imageURL: defaultImageURL,
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
    </Router>,
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
        expect(wrapper.find('[data-test="third-line"]')).not.toBeNull();
      });
      it('Should third line heading have medium margin', () => {
        expect(
          wrapper
            .find(Heading)
            .filterWhere(
              (item) =>
                item.prop('margin') === 'medium' && item.prop('data-test') === 'third-line-heading',
            ),
        ).toHaveLength(1);
      });
      it('Should render button wrapper', () => {
        expect(wrapper.find('[data-test="button-wrapper"]')).not.toBeNull();
      });
    });

    describe('Data without second line', () => {
      const props = {
        ...defaultProps,
        data: {
          title: { rendered: 'test title' },
          acf: {
            ...defaultProps.data.acf,
            secondLine: '',
          },
        },
      };
      const wrapper = setUp(props);
      it('Should third line heading have big margin', () => {
        expect(
          wrapper
            .find(Heading)
            .filterWhere(
              (item) =>
                item.prop('margin') === 'big' && item.prop('data-test') === 'third-line-heading',
            ),
        ).toHaveLength(1);
      });
    });

    describe('Minimum slide data', () => {
      const props = {
        ...defaultProps,
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

    describe('Latest news slide with thumbnail', () => {
      const props = {
        ...defaultProps,
        data: {
          title: { rendered: 'test title' },
          acf: {
            ...defaultProps.data.acf,
            extraInfo: slidesExtraInfo.LATEST_NEWS,
          },
        },
      };
      const store = mockStore({
        data: {
          basic: {
            latestNews: {
              title: 'test title',
              slug: 'test-slug',
              thumbnail: 'test url',
            },
          },
        },
      });
      const wrapper = setUp(props, store);
      it('Should button link to correct article', () => {
        expect(
          wrapper
            .find(Link)
            .filterWhere(
              (item) =>
                item.prop('to') === '/aktualnosci/test-slug' &&
                item.prop('data-test') === 'router-link',
            ),
        ).toHaveLength(1);
      });
      it('Should third line heading have correct title', () => {
        expect(
          wrapper
            .find(Heading)
            .filterWhere(
              (item) =>
                item.prop('children') === 'test title' &&
                item.prop('data-test') === 'third-line-heading',
            ),
        ).toHaveLength(1);
      });
      it('Should image background have correct src', () => {
        expect(wrapper.find('.bg-image').prop('src')).toBe('test url');
      });
    });

    describe('Latest news slide without thumbnail', () => {
      const props = {
        ...defaultProps,
        data: {
          title: { rendered: 'test title' },
          acf: {
            ...defaultProps.data.acf,
            extraInfo: slidesExtraInfo.LATEST_NEWS,
          },
        },
      };
      const store = mockStore({
        data: {
          basic: {
            latestNews: {
              title: 'test title',
              slug: 'test-slug',
              thumbnail: '',
            },
          },
        },
      });
      const wrapper = setUp(props, store);
      it('Should image background have correct src', () => {
        expect(wrapper.find('.bg-image').prop('src')).toBe(defaultImageURL);
      });
    });
  });
});
