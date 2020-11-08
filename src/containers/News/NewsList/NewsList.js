import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import * as SC from './NewsList.sc';
import Loader from '../../../components/UI/Loader';
import NewsItem from './NewsItem/NewsItem';
import Heading from '../../../components/UI/Heading/Heading';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';

const NewsList = (props) => {
  const { isLoading, isError } = useSelector((state) => state.ui);

  const { news } = props;

  const history = useHistory();
  const { search } = history.location;

  let newsList = isLoading ? <Loader /> : null;
  if (news) {
    if (news.length <= 0) {
      newsList = <Heading variant="h3">Nie znaleziono żadnych aktualności</Heading>;
    } else {
      const { p: urlPage } = queryString.parse(search);
      const urlPageNumber = +urlPage || 1;

      let loopNews = null;
      if (urlPageNumber === 1) {
        loopNews = news.slice(1).map((newsItem) => <NewsItem key={newsItem.id} data={newsItem} />);
      } else {
        loopNews = news.map((newsItem) => <NewsItem key={newsItem.id} data={newsItem} />);
      }

      const allNews = (
        <>
          {urlPageNumber === 1 && <NewsItem data={news[0]} newest />}
          {loopNews}
        </>
      );

      const loadingOverlay = isLoading ? <LoadingOverlay /> : null;

      newsList = (
        <SC.Wrapper>
          {loadingOverlay}
          {allNews}
        </SC.Wrapper>
      );
    }
  }

  if (isError) {
    newsList = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem artykułów
      </Heading>
    );
  }

  return newsList;
};

NewsList.defaultProps = {
  news: null,
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
};

export default NewsList;
