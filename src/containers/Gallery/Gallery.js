import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import HeadingImage from '../../components/UI/HeadingImage';
import Loader from '../../components/UI/Loader';
import { headingImages } from '../../shared/constants';

const SC = {};
SC.Wrapper = styled.div`
  & .year-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  & .year-panel-link {
    height: 20rem;
    display: block;
    margin: ${({ theme }) => theme.spacings.level2};
    max-width: 25rem;
    width: 100%;
  }

  & .year-panel {
    align-items: center;
    background-color: #666;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  & .year-text {
    font-size: ${({ theme }) => theme.fontSizes.level5};
  }
`;

const Gallery = () => {
  const { oldestGalleryYear, newestGalleryYear } = useSelector((state) => state.gallery);

  const dispatch = useDispatch();
  const onFetchGalleriesDates = useCallback(() => dispatch(actions.fetchGalleriesDates(null)), [
    dispatch,
  ]);

  useEffect(() => {
    if (oldestGalleryYear) return;
    onFetchGalleriesDates();
  }, [oldestGalleryYear, onFetchGalleriesDates]);

  let yearList = <Loader />;
  if (oldestGalleryYear) {
    const yearListPanels = [];
    for (let i = newestGalleryYear; i >= oldestGalleryYear; i -= 1) {
      yearListPanels.push(
        <Link key={i} to={`/galeria/${i}`} className="year-panel-link">
          <div className="year-panel">
            <span className="year-text">{i}</span>
          </div>
        </Link>,
      );
    }
    yearList = <div className="year-list">{yearListPanels}</div>;
  }

  return (
    <FreeSides>
      <SC.Wrapper>
        <HeadingImage slug={headingImages.GALLERY} />
        {yearList}
      </SC.Wrapper>
    </FreeSides>
  );
};

export default Gallery;
