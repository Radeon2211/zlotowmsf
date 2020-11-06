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
import { MAX_QUANTITY_PER_PAGE } from '../../shared/constants';

const News = () => {
  const { news, newsCount } = useSelector((state) => state.news);
  const { isLoading } = useSelector((state) => state.ui);

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

  const numberOfPages = Math.ceil((newsCount - 1) / MAX_QUANTITY_PER_PAGE);
  const pagination =
    numberOfPages > 1 ? (
      <Pagination itemQuantity={newsCount} oneExtra maxQuantityPerPage={MAX_QUANTITY_PER_PAGE} />
    ) : null;

  return (
    <FreeSides>
      <Heading variant="h2" margin="small">
        Aktualności
      </Heading>
      <Line mgBottom="large" />
      <NewsList news={news} isNewsLoading={isLoading} />
      {pagination}
    </FreeSides>
  );
};

export default News;
