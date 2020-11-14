/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import Priests from './Priests';
import PriestList from './PriestList/PriestList';
import Loader from '../../components/UI/Loader';

const mockStore = configureMockStore([thunk]);

const createPriest = (id) => ({
  id,
  acf: {
    image: 'data:image',
    dayOfBirth: '01.01.2020',
    nameDay: '02.02.2020',
    religiousVows: '03.03.2020',
    ordination: '04.04.2020',
  },
  title: { rendered: 'test name' },
});

const createStore = (priests, isError) =>
  mockStore({
    data: { priests },
    ui: { isError },
  });

const setUp = (priests, isError = false) => {
  const store = createStore(priests, isError);
  return mount(
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Priests />
        </ThemeProvider>
      </Router>
    </Provider>,
  );
};

describe('<Priests />', () => {
  describe('Check if elements render correctly', () => {
    it('Should render <Loader />', () => {
      const wrapper = setUp(null, false);
      expect(wrapper.find(Loader)).toHaveLength(1);
    });

    it('Should render not found <Heading />', () => {
      const wrapper = setUp([], false);
      expect(wrapper.find('[data-test="not-found"]').length).toBeGreaterThan(0);
    });

    it('Should render and <PriestList /> and NOT render error', () => {
      const wrapper = setUp([createPriest(1)]);
      expect(wrapper.find(PriestList)).toHaveLength(1);
      expect(wrapper.find('[data-test="error"]')).toHaveLength(0);
    });

    it('Should render error', () => {
      const wrapper = setUp(null, true);
      expect(wrapper.find('[data-test="error"]').length).toBeGreaterThan(0);
    });
  });
});
