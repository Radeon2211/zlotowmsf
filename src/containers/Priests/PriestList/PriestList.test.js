import React from 'react';
import { mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../styled/theme';
import PriestList from './PriestList';
import * as SC from './PriestList.sc';
import { checkProps } from '../../../shared/utility';

const createProps = (priests) => ({
  priests,
});

const createPriest = (id) => ({
  id,
  acf: {
    image: 'data:image',
    dateOfBirth: '01.01.2020',
    nameDay: '2 lutego',
    religiousVows: '03.03.2020',
    ordination: '04.04.2020',
  },
  title: { rendered: 'test name' },
});

const defaultProps = createProps([createPriest(1)]);

const setUp = (props = defaultProps) => {
  return mount(
    <Router>
      <ThemeProvider theme={theme}>
        <PriestList {...props} />
      </ThemeProvider>
    </Router>,
  );
};

describe('<PriestList />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(PriestList, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(PriestList, {})).not.toBe(null);
    });
  });

  describe('Check if elements render correctly', () => {
    it('Should render one <SC.Priest /> with default data', () => {
      const wrapper = setUp();
      expect(wrapper.find(SC.Priest)).toHaveLength(1);
      expect(wrapper.find('.image-wrapper')).toHaveLength(1);
      expect(wrapper.find('.image')).toHaveLength(1);
      expect(wrapper.find('.image').prop('src')).toBe('data:image');
      expect(wrapper.find('.info-row')).toHaveLength(4);
      expect(wrapper.find('[data-test="name"]').first().text()).toBe('test name');
      expect(wrapper.find('[data-test="date-of-birth"]').first().text()).toBe('01.01.2020r.');
      expect(wrapper.find('[data-test="name-day"]').first().text()).toBe('2 lutego');
      expect(wrapper.find('[data-test="religious-vows"]').first().text()).toBe('03.03.2020r.');
      expect(wrapper.find('[data-test="ordination"]').first().text()).toBe('04.04.2020r.');
    });

    it('Should render three <SC.Priest />', () => {
      const props = createProps([createPriest(1), createPriest(2), createPriest(3)]);
      const wrapper = setUp(props);
      expect(wrapper.find(SC.Priest)).toHaveLength(3);
    });
  });
});
