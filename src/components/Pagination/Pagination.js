import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import * as SC from './Pagination.sc';
import DarkButton from '../UI/Buttons/DarkButton/DarkButton';
import { ReactComponent as ArrowIcon } from '../../images/SVG/arrow.svg';
import { ReactComponent as DoubleArrowIcon } from '../../images/SVG/double-arrow.svg';

const Pagination = (props) => {
  const { itemQuantity, oneExtra, maxQuantityPerPage } = props;

  const history = useHistory();
  const { search, pathname } = history.location;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItemQuantity = oneExtra ? itemQuantity - 1 : itemQuantity;
  const numberOfPages = Math.ceil(totalItemQuantity / maxQuantityPerPage);

  useEffect(() => {
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage || 1;
    setCurrentPage(urlPageNumber);
  }, [search]);

  const numberPageClickHandle = (number) => {
    if (currentPage === number) return;
    history.push(`${pathname}?p=${number}`);
  };

  const firstPageClickHandle = () => {
    if (currentPage === 1) return;
    history.push(`${pathname}`);
  };

  const prevPageClickHandle = () => {
    if (currentPage === 1) return;
    if (currentPage === 2) {
      history.push(`${pathname}`);
    } else {
      history.push(`${pathname}?p=${currentPage - 1}`);
    }
  };

  const nextPageClickHandle = () => {
    if (currentPage === numberOfPages) return;
    history.push(`${pathname}?p=${currentPage + 1}`);
  };

  const lastPageClickHandle = () => {
    if (currentPage === numberOfPages) return;
    history.push(`${pathname}?p=${numberOfPages}`);
  };

  let pagination = null;
  if (itemQuantity > 0) {
    const numberButtons = [];
    for (let i = 1; i <= numberOfPages; i += 1) {
      numberButtons.push(
        <DarkButton
          key={i}
          size="small"
          shape="circle"
          active={currentPage === i}
          clicked={() => numberPageClickHandle(i)}
          data-test={`number-button${i}`}
        >
          {i}
        </DarkButton>
      );
    }

    pagination = (
      <SC.Wrapper>
        <DarkButton
          size="small"
          shape="circle"
          childRotation={180}
          disabled={currentPage === 1}
          clicked={firstPageClickHandle}
          data-test="first-page-button"
        >
          <DoubleArrowIcon />
        </DarkButton>
        <DarkButton
          size="small"
          shape="circle"
          childRotation={180}
          disabled={currentPage === 1}
          clicked={prevPageClickHandle}
          data-test="prev-page-button"
        >
          <ArrowIcon />
        </DarkButton>
        {numberButtons}
        <DarkButton
          size="small"
          shape="circle"
          disabled={currentPage === numberOfPages}
          clicked={nextPageClickHandle}
          data-test="next-page-button"
        >
          <ArrowIcon />
        </DarkButton>
        <DarkButton
          size="small"
          shape="circle"
          disabled={currentPage === numberOfPages}
          clicked={lastPageClickHandle}
          data-test="last-page-button"
        >
          <DoubleArrowIcon />
        </DarkButton>
      </SC.Wrapper>
    );
  }

  return pagination;
};

Pagination.defaultProps = {
  oneExtra: false,
};

Pagination.propTypes = {
  itemQuantity: PropTypes.number.isRequired,
  oneExtra: PropTypes.bool,
  maxQuantityPerPage: PropTypes.number.isRequired,
};

export default Pagination;
