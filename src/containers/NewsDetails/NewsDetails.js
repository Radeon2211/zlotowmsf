import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import decodeEntities from 'parse-entities';
import moment from 'moment';
import 'moment/locale/pl';
import * as actions from '../../store/actions/indexActions';
import FreeSides from '../../components/UI/FreeSides';
import * as SC from './NewsDetails.sc';
import Heading from '../../components/UI/Heading/Heading';
import Loader from '../../components/UI/Loader';
import ImagesGallery from '../../components/ImageGallery/ImageGallery';
import EditorContent from '../../components/UI/EditorContent';

moment.locale('pl');

const NewsDetails = (props) => {
  const {
    match: {
      params: { slug },
    },
  } = props;

  const { newsDetails } = useSelector((state) => state.news);
  const { isError } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const onFetchNewsDetails = useCallback(
    (newsSlug) => dispatch(actions.fetchNewsDetails(newsSlug)),
    [dispatch],
  );
  const onClearNewsDetails = useCallback(() => dispatch(actions.setNewsDetails(null)), [dispatch]);
  const onClearError = useCallback(() => dispatch(actions.fetchSuccess()), [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    onFetchNewsDetails(slug);
    return () => {
      onClearNewsDetails();
      onClearError();
    };
  }, [onFetchNewsDetails, onClearNewsDetails, onClearError, slug]);

  let newsDetailsNode = <Loader />;
  if (newsDetails === undefined) {
    newsDetailsNode = (
      <Heading variant="h3" align="center">
        Nie znaleziono takiego artykułu
      </Heading>
    );
  } else if (newsDetails) {
    const {
      title,
      acf: { thumbnail },
      date,
      content,
      images,
    } = newsDetails;

    newsDetailsNode = (
      <SC.Wrapper>
        <img src={thumbnail} alt="miniaturka" className="thumbnail" />
        <Heading variant="h3" margin="medium">
          {decodeEntities(title.rendered)}
        </Heading>
        <span className="date">{moment(date).format('LL')}</span>
        <EditorContent content={content.rendered} />
        <ImagesGallery images={images} galleryHeading />
      </SC.Wrapper>
    );
  }

  if (isError) {
    newsDetailsNode = (
      <Heading variant="h3" align="center" data-test="error">
        Wystąpił problem z pobieraniem artykułu
      </Heading>
    );
  }

  return <FreeSides>{newsDetailsNode}</FreeSides>;
};

NewsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default NewsDetails;
