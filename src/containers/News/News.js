import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as actions from '../../store/actions/indexActions';
import NewsList from './NewsList/NewsList';
import FreeSides from '../../components/UI/FreeSides';
import styled from 'styled-components';
import Heading from '../../components/UI/Heading/Heading';
import Line from '../../components/UI/Line';
import Pagination from '../../components/Pagination/Pagination';

const SC = {};
SC.Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacings.level5} 0;
`;

const News = () => {
  const { news, newsCount, isLoading } = useSelector((state) => state.data);

  const history = useHistory();
  const { search } = history.location;

  const dispatch = useDispatch();
  const onFetchNews = useCallback((pageNumber, oneExtra) => dispatch(actions.fetchNews(pageNumber, oneExtra)), [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const { p: urlPage } = queryString.parse(search);
    const urlPageNumber = +urlPage || 1;
    const oneExtra = urlPageNumber === 1;
    onFetchNews(urlPageNumber, oneExtra);
  }, [onFetchNews, search]);

  return (
    <FreeSides>
      <SC.Wrapper>
        <Heading variant="h2" margin="small">Aktualności</Heading>
        <Line mgBottom="large" />
        <NewsList news={news} isNewsLoading={isLoading} />
        <Pagination itemQuantity={newsCount} oneExtra />
      </SC.Wrapper>
    </FreeSides>
  );
};

export default News;
