import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SC from './NewsList.sc';
import * as actions from '../../../store/actions/indexActions';
import Loader from '../../../components/UI/Loaders/StartLoader';
import NewsItem from './NewsItem/NewsItem';
import Heading from '../../../components/UI/Heading/Heading';

const NewsList = () => {
  const { news } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  const onFetchNews = useCallback(() => dispatch(actions.fetchNews()), [dispatch]);

  useEffect(() => {
    onFetchNews();
  }, [onFetchNews]);

  let newsList = <Loader />;
  if (news) {
    if (news.length <= 0) {
      newsList = <Heading variant="h3">Nie znaleziono żadnych aktualności</Heading>;
    } else {
      const gridNews = news.slice(1).map((newsItem) => (
        <NewsItem key={newsItem.id} data={newsItem} />
      ));

      newsList = (
        <>
          <SC.Grid>
            <NewsItem data={news[0]} newest />
            {gridNews}
          </SC.Grid>
        </>
      );
    }
  }

  return newsList;
};

export default NewsList;
