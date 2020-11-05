import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../styled/theme';
import Pagination from './Pagination';
import DarkButton from '../UI/Buttons/DarkButton';
import * as SC from './Pagination.sc';
import { checkProps } from '../../shared/utility';

const setUp = (props = {}, history) => {
  return mount(
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Pagination {...props} />
      </ThemeProvider>
    </Router>,
  );
};

const createProps = (itemQuantity = 10, maxQuantityPerPage = 10, oneExtra = true) => ({
  itemQuantity,
  maxQuantityPerPage,
  oneExtra,
});

const createHistory = (pageNumber) => ({
  listen: jest.fn(),
  location: { search: `?p=${pageNumber}`, pathname: '' },
  createHref: jest.fn(),
  push: jest.fn(),
});

const defaultProps = createProps();
const defaultHistory = createHistory(1);

describe('<Pagination />', () => {
  describe('Check prop types', () => {
    it('Should NOT throw a warning', () => {
      expect(checkProps(Pagination, defaultProps)).toBeUndefined();
    });
    it('Should throw a warning', () => {
      expect(checkProps(Pagination, {})).not.toBe(null);
    });
  });

  describe('Check if buttons render correctly', () => {
    it('Should NOT render any buttons and <SC.Wrapper />', () => {
      const props = createProps(0);
      const wrapper = setUp(props, defaultHistory);
      expect(wrapper.find(SC.Wrapper)).toHaveLength(0);
      expect(wrapper.find(DarkButton)).toHaveLength(0);
    });

    it('Should render all arrow buttons', () => {
      const wrapper = setUp(defaultProps, defaultHistory);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere((item) => item.prop('data-test') === 'first-page-button'),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere((item) => item.prop('data-test') === 'prev-page-button'),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere((item) => item.prop('data-test') === 'next-page-button'),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere((item) => item.prop('data-test') === 'last-page-button'),
      ).toHaveLength(1);
    });

    it('Should all buttons be disabled', () => {
      const wrapper = setUp(defaultProps, defaultHistory);
      expect(wrapper.find(DarkButton).filterWhere((item) => item.prop('disabled'))).toHaveLength(4);
    });

    it('Should NOT all buttons be disabled', () => {
      const history = createHistory(2);
      const props = createProps(10, 3);
      const wrapper = setUp(props, history);
      expect(wrapper.find(DarkButton).filterWhere((item) => item.prop('disabled'))).toHaveLength(0);
    });

    it('Should first, prev buttons be disabled and NOT next, last buttons', () => {
      const props = createProps(10, 3);
      const wrapper = setUp(props, defaultHistory);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('disabled') && item.prop('data-test') === 'first-page-button',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('disabled') && item.prop('data-test') === 'prev-page-button',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => !item.prop('disabled') && item.prop('data-test') === 'next-page-button',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => !item.prop('disabled') && item.prop('data-test') === 'last-page-button',
          ),
      ).toHaveLength(1);
    });

    it('Should next, last buttons be disabled and NOT first, prev buttons', () => {
      const history = createHistory(3);
      const props = createProps(10, 3);
      const wrapper = setUp(props, history);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => !item.prop('disabled') && item.prop('data-test') === 'first-page-button',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => !item.prop('disabled') && item.prop('data-test') === 'prev-page-button',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('disabled') && item.prop('data-test') === 'next-page-button',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('disabled') && item.prop('data-test') === 'last-page-button',
          ),
      ).toHaveLength(1);
    });

    it('Should render one number button', () => {
      const wrapper = setUp(defaultProps, defaultHistory);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere((item) => item.prop('data-test').includes('number-button')),
      ).toHaveLength(1);
    });

    it('Should render three number button', () => {
      const props = createProps(10, 3);
      const wrapper = setUp(props, defaultHistory);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere((item) => item.prop('data-test').includes('number-button')),
      ).toHaveLength(3);
    });

    it('Should be only number button1 active', () => {
      const props = createProps(10, 3);
      const wrapper = setUp(props, defaultHistory);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('active') && item.prop('data-test') === 'number-button1',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('active') && item.prop('data-test').includes('number-button'),
          ),
      ).toHaveLength(1);
    });

    it('Should be only number button3 active', () => {
      const history = createHistory(3);
      const props = createProps(20, 3);
      const wrapper = setUp(props, history);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('active') && item.prop('data-test') === 'number-button3',
          ),
      ).toHaveLength(1);
      expect(
        wrapper
          .find(DarkButton)
          .filterWhere(
            (item) => item.prop('active') && item.prop('data-test').includes('number-button'),
          ),
      ).toHaveLength(1);
    });
  });

  describe('Check if buttons correctly handle clicks', () => {
    it('Should all buttons call handlers and push new path', () => {
      const history = createHistory(3);
      const props = createProps(20, 3);
      const wrapper = setUp(props, history);
      const correctPushCalls = [[''], ['?p=2'], ['?p=4'], ['?p=7']];
      wrapper.find(DarkButton).forEach((item) => {
        if (item.prop('data-test').includes('page-button')) {
          item.simulate('click');
        }
      });
      expect(history.push.mock.calls).toEqual(correctPushCalls);
    });

    it('Should all buttons NOT call handlers', () => {
      const history = createHistory(1);
      const wrapper = setUp(defaultProps, history);
      wrapper.find(DarkButton).forEach((item) => {
        if (item.prop('data-test').includes('page-button')) {
          item.simulate('click');
        }
      });
      expect(history.push.mock.calls).toHaveLength(0);
    });

    it('Should only first and prev buttons call handlers and push new path', () => {
      const history = createHistory(3);
      const props = createProps(10, 3);
      const wrapper = setUp(props, history);
      const correctPushCalls = [[''], ['?p=2']];
      wrapper.find(DarkButton).forEach((item) => {
        if (item.prop('data-test').includes('page-button')) {
          item.simulate('click');
        }
      });
      expect(history.push.mock.calls).toEqual(correctPushCalls);
    });

    it('Should only next and last buttons call handlers and push new path', () => {
      const history = createHistory(1);
      const props = createProps(10, 3);
      const wrapper = setUp(props, history);
      const correctPushCalls = [['?p=2'], ['?p=3']];
      wrapper.find(DarkButton).forEach((item) => {
        if (item.prop('data-test').includes('page-button')) {
          item.simulate('click');
        }
      });
      expect(history.push.mock.calls).toEqual(correctPushCalls);
    });
  });
});
