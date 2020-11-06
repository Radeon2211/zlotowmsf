import React from 'react';
import styled from 'styled-components';
import FreeSides from '../../components/UI/FreeSides';
import HeadingImage from '../../components/UI/HeadingImage';
import { headingImages } from '../../shared/constants';

const SC = {};
SC.Wrapper = styled.div``;

const GalleryYear = () => {
  return (
    <FreeSides>
      <SC.Wrapper>
        <HeadingImage slug={headingImages.GALLERY} />
      </SC.Wrapper>
    </FreeSides>
  );
};

export default GalleryYear;
