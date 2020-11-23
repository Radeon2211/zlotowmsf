import React, { useEffect } from 'react';
import Slides from './Slides/Slides';
import CommonVisitedLinks from './CommonVisitedLinks/CommonVisitedLinks';

const Start = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  return (
    <>
      <Slides />
      <CommonVisitedLinks />
    </>
  );
};

export default Start;
