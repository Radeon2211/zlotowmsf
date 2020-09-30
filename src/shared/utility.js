import checkPropTypes from 'check-prop-types';

export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const checkProps = (component, expectedProps) => {
  return checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
};
