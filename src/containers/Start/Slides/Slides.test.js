import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import Slides from './Slides';
import Slide from './Slide/Slide';

const mockStore = configureMockStore([thunk]);

const createSlide = (id) => ({
  id,
  title: {},
  acf: { firstLine: 'test heading' },
});

const setUp = (store) => {
  return mount(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Slides />
      </ThemeProvider>
    </Provider>,
  );
};

describe('<Slides />', () => {
  describe('Check if renders correctly', () => {
    it('Should render three <Slide /> and three list buttons', () => {
      const store = mockStore({
        data: { basic: { slides: [createSlide(1), createSlide(2), createSlide(3)] } },
      });
      const wrapper = setUp(store);
      expect(wrapper.find('[data-test="slide-number-button"]').length).toBeGreaterThan(0);
      expect(wrapper.find(Slide)).toHaveLength(3);
    });
    it('Should render one previous and next button', () => {
      const store = mockStore({
        data: { basic: { slides: [createSlide(1)] } },
      });
      const wrapper = setUp(store);
      expect(wrapper.find('[data-test="prev-slide-button"]').length).toBeGreaterThan(0);
      expect(wrapper.find('[data-test="next-slide-button"]').length).toBeGreaterThan(0);
    });
  });
});
