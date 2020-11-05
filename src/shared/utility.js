// eslint-disable-next-line import/no-extraneous-dependencies
import checkPropTypes from 'check-prop-types';
import DOMPurify from 'dompurify';

export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const checkProps = (component, expectedProps) => {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};

export const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, { ADD_TAGS: ['iframe'] });
};
