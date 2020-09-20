export const updateObject = (oldObject, updatedProps) => ({
  ...oldObject,
  ...updatedProps,
});

export const isDevMobile = () => {
  return process.env.NODE_ENV === 'development' && navigator.userAgent.match(/Android/i);
}