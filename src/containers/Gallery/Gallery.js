import React from 'react';
import styled from 'styled-components';
import galleryImage from '../../images/gallery-heading.jpg';
import FreeSides from '../../components/UI/FreeSides';

const SC = {};
SC.Wrapper = styled.div`
  & .heading-image {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }
`;

const Gallery = () => {
  return (
    <FreeSides>
      <SC.Wrapper>
        <img src={galleryImage} alt="galeria" className="heading-image" />
      </SC.Wrapper>
    </FreeSides>
  );
};

export default Gallery;
