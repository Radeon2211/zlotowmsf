import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import * as SC from './Pagination.sc';
import DarkButton from '../UI/Buttons/DarkButton/DarkButton';
import { ReactComponent as ArrowIcon } from '../../images/SVG/arrow.svg';
import { ReactComponent as DoubleArrowIcon } from '../../images/SVG/double-arrow.svg';
import { MAX_QUANTITY_PER_PAGE } from '../../shared/constants';

const Pagination = (props) => {
  const { itemQuantity, oneExtra } = props;

  const history = useHistory();
  const { search, pathname } = history.location;

  const [currentPage, setCurrentPage] = useState(1);

  const totalItemQuantity = oneExtra ? itemQuantity - 1 : itemQuantity;
  const numberOfPages = Math.ceil(totalItemQuantity / MAX_QUANTITY_PER_PAGE);

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
        >
          <DoubleArrowIcon />
        </DarkButton>
        <DarkButton
          size="small"
          shape="circle"
          childRotation={180}
          disabled={currentPage === 1}
          clicked={prevPageClickHandle}
        >
          <ArrowIcon />
        </DarkButton>
        {numberButtons}
        <DarkButton size="small" shape="circle" disabled={currentPage === numberOfPages} clicked={nextPageClickHandle}>
          <ArrowIcon />
        </DarkButton>
        <DarkButton size="small" shape="circle" disabled={currentPage === numberOfPages} clicked={lastPageClickHandle}>
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
};

export default Pagination;
