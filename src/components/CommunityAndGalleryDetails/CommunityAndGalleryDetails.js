import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import decodeEntities from 'parse-entities';
import FreeSides from '../UI/FreeSides';
import Heading from '../UI/Heading/Heading';
import Loader from '../UI/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import EditorContent from '../UI/EditorContent';
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

  let siteContent = <Loader />;
  if (data === undefined) {
    siteContent = (
      <Heading variant="h3" align="center" data-test="not-found">
        {`Nie znaleziono takiej ${
          siteName === siteNames.PARISH_COMMUNITY_DETAILS ? 'wspólnoty' : 'galerii'
        }`}
      </Heading>
    );
  } else if (data) {
    const { title, images, content } = data;

    siteContent = (
      <SC.Wrapper>
        <Heading variant="h3" margin="medium" align="center">
          {decodeEntities(title.rendered)}
        </Heading>
        <EditorContent content={content.rendered} />
        <ImageGallery images={images} />
      </SC.Wrapper>
    );
  }

  if (isError) {
    siteContent = (
      <Heading variant="h3" align="center" data-test="error">
        {`Wystąpił problem z pobieraniem ${
          siteName === siteNames.PARISH_COMMUNITY_DETAILS ? 'wspólnoty' : 'galerii'
        }`}
      </Heading>
    );
  }

  return <FreeSides>{siteContent}</FreeSides>;
};

CommunityAndGalleryDetails.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.oneOfType([PropTypes.object]),
  isError: PropTypes.bool.isRequired,
  siteName: PropTypes.string.isRequired,
};

export default CommunityAndGalleryDetails;
