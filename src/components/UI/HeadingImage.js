import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { headingImages } from '../../shared/constants';
import galleryImage from '../../images/gallery-heading.jpg';
import priestsImage from '../../images/priests-heading.jpg';
import communitiesImage from '../../images/communities-heading.jpg';

const SC = {};
SC.Wrapper = styled.div`
  & .heading-image {
    margin-bottom: ${({ theme }) => theme.spacings.level3};
  }
`;

const HeadingImage = (props) => {
  const { slug } = props;

  let imageSrc = '';
  let imageAlt = '';
  switch (slug) {
    case headingImages.GALLERY:
      imageSrc = galleryImage;
      imageAlt = 'Galeria';
      break;
    case headingImages.PRIESTS:
      imageSrc = priestsImage;
      imageAlt = 'Duszpasterze';
      break;
    case headingImages.COMMUNITIES:
      imageSrc = communitiesImage;
      imageAlt = 'Wspólnoty parafialne';
      break;
    default:
      break;
  }

  return (
    <SC.Wrapper>
      <img src={imageSrc} alt={imageAlt} className="heading-image" />
    </SC.Wrapper>
  );
};

HeadingImage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default HeadingImage;
