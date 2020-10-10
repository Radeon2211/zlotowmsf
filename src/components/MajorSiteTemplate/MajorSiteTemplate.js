import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SC from './MajorSiteTemplate.sc';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../UI/FreeSides';
import Loader from '../UI/Loader';

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
      <SC.Wrapper>
        <FreeSides>
          <div dangerouslySetInnerHTML={{ __html: siteData.content.rendered }} />
        </FreeSides>
      </SC.Wrapper>
    );
  }

  return siteContent;
};

export default MajorSiteTemplate;
