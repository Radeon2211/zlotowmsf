import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../UI/FreeSides';
import Loader from '../UI/Loader';
import { sanitizeHtml } from '../../shared/utility';

const SC = {};
SC.Wrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.level4};
`;

const MajorSiteTemplate = (props) => {
  const { siteSlug } = props;

  const { sites } = useSelector((state) => state.data);
  const siteData = sites ? sites[siteSlug] : null;

  const dispatch = useDispatch();
  const onFetchSite = useCallback((slug) => dispatch(actions.fetchSite(slug)), [dispatch]);

  useEffect(() => {
    if (siteData) return;
    onFetchSite(siteSlug);
  }, [onFetchSite, siteSlug, siteData]);

  let siteContent = <Loader />;
  if (siteData) {
    siteContent = (
      <FreeSides>
        <SC.Wrapper>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(siteData.content.rendered),
            }}
          />
        </SC.Wrapper>
      </FreeSides>
    );
  }

  return siteContent;
};

export default MajorSiteTemplate;
