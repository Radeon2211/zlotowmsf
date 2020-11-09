import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import decodeEntities from 'parse-entities';
import FreeSides from '../UI/FreeSides';
import Heading from '../UI/Heading/Heading';
import Loader from '../UI/Loader';
import ImagesGallery from '../ImageGallery/ImageGallery';
import { siteNames } from '../../shared/constants';

export const SC = {};
SC.Wrapper = styled.div`
  & .description {
    font-size: ${({ theme }) => theme.fontSizes.level4};
    margin: ${({ theme }) => theme.spacings.level3} 0;
  }
`;

const CommunityAndGalleryDetails = (props) => {
  const { data, isError, siteName } = props;

  let content = <Loader />;
  if (data === undefined) {
    content = (
      <Heading variant="h3" align="center" data-test="not-found">
        {`Nie znaleziono takiej ${
          siteName === siteNames.PARISH_COMMUNITY_DETAILS ? 'wspólnoty' : 'galerii'
        }`}
      </Heading>
    );
  } else if (data) {
    const {
      acf: { description },
      title,
      images,
    } = data;

    const imagesGallery = images?.length > 0 ? <ImagesGallery images={images} /> : null;

    const descriptionNode = description ? <div className="description">{description}</div> : null;

    content = (
      <SC.Wrapper>
        <Heading variant="h3" margin="medium" align="center">
          {decodeEntities(title.rendered)}
        </Heading>
        {descriptionNode}
        {imagesGallery}
      </SC.Wrapper>
    );
  }

  if (isError) {
    content = (
      <Heading variant="h3" align="center" data-test="error">
        {`Wystąpił problem z pobieraniem danych o ${
          siteName === siteNames.PARISH_COMMUNITY_DETAILS ? 'wspólnocie' : 'galerii'
        }`}
      </Heading>
    );
  }

  return <FreeSides>{content}</FreeSides>;
};

CommunityAndGalleryDetails.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.oneOfType([PropTypes.object]),
  isError: PropTypes.bool.isRequired,
  siteName: PropTypes.string.isRequired,
};

export default CommunityAndGalleryDetails;
