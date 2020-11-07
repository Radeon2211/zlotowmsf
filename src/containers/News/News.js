import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as actions from '../../store/actions/indexActions';
import NewsList from './NewsList/NewsList';
import FreeSides from '../../components/UI/FreeSides';
import Heading from '../../components/UI/Heading/Heading';
import Line from '../../components/UI/Line';
import Pagination from '../../components/Pagination/Pagination';
import { maxQuantityPerPage } from '../../shared/constants';

const News = () => {
  const { news, newsCount } = useSelector((state) => state.news);

  const history = useHistory();
  const { search } = history.location;

  const dispatch = useDispatch();
  const onFetchNews = useCallback(
    (pageNumber, oneExtra) => dispatch(actions.fetchNews(pageNumber, oneExtra)),
    [dispatch],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage || 1;
    const oneExtra = urlPageNumber === 1;
    onFetchNews(urlPageNumber, oneExtra);
  }, [onFetchNews, search]);

  const numberOfPages = Math.ceil((newsCount - 1) / maxQuantityPerPage.NEWS);
  const pagination =
    numberOfPages > 1 ? (
      <Pagination itemQuantity={newsCount} oneExtra maxQuantityPerPage={maxQuantityPerPage.NEWS} />
    ) : null;

  return (
    <FreeSides>
      <Heading variant="h2" margin="small">
        Aktualności
      </Heading>
      <Line mgBottom="medium" />
      <NewsList news={news} />
      {pagination}
    </FreeSides>
  );
};

export default News;
